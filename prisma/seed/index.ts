import { PrismaClient } from "@prisma/client";
import { seedUser, seedForms, seedBlocks, seedSubmissions } from "./data";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clean existing data (optional - comment out if you want to preserve data)
  console.log("🧹 Cleaning existing data...");
  await prisma.formFieldResponse.deleteMany();
  await prisma.formSubmission.deleteMany();
  await prisma.formBlock.deleteMany();
  await prisma.form.deleteMany();
  await prisma.user.deleteMany();
  console.log("✓ Existing data cleaned");

  // 1. Create user
  console.log("\n👤 Creating user...");
  const user = await prisma.user.upsert({
    where: { email: seedUser.email },
    update: {},
    create: seedUser,
  });
  console.log(`✓ User created: ${user.email} (ID: ${user.id})`);

  // 2. Create forms with blocks
  console.log("\n📝 Creating forms with blocks...");
  const createdForms: Record<
    string,
    { id: string; blocks: Record<string, string> }
  > = {};

  for (const formData of seedForms) {
    const blocks = seedBlocks[formData.id] || [];

    const form = await prisma.form.create({
      data: {
        ...formData,
        userId: user.id, // Use the actual user ID
        publishedAt: formData.status === "published" ? new Date() : null,
        blocks: {
          create: blocks,
        },
      },
      include: {
        blocks: true,
      },
    });

    // Create blockName -> blockId mapping for submissions
    const blockMapping: Record<string, string> = {};
    form.blocks.forEach((block) => {
      blockMapping[block.name] = block.id;
    });

    createdForms[formData.id] = {
      id: form.id,
      blocks: blockMapping,
    };

    console.log(
      `✓ Form: "${formData.title}" (${formData.status}) - ${blocks.length} blocks | Views: ${formData.views}, Starts: ${formData.starts}, Completions: ${formData.completions}`,
    );
  }

  // 3. Create submissions with responses
  console.log("\n📊 Creating submissions with responses...");
  let submissionsCreated = 0;
  let responsesCreated = 0;

  for (const subData of seedSubmissions) {
    const formMapping = createdForms[subData.formId];
    if (!formMapping) {
      console.warn(
        `⚠ Skipping submission ${subData.id} - form ${subData.formId} not found`,
      );
      continue;
    }

    // Map blockName to blockId for responses
    const responses = subData.responses
      .map((response) => {
        const blockId = formMapping.blocks[response.blockName];
        if (!blockId) {
          console.warn(
            `⚠ Block ${response.blockName} not found in form ${subData.formId}`,
          );
          return null;
        }
        return {
          blockId,
          value: response.value,
        };
      })
      .filter((r) => r !== null);

    if (responses.length === 0) {
      console.warn(`⚠ Skipping submission ${subData.id} - no valid responses`);
      continue;
    }

    // Create submission
    await prisma.formSubmission.create({
      data: {
        formId: formMapping.id,
        submittedAt: subData.submittedAt,
        responses: {
          create: responses,
        },
      },
    });

    submissionsCreated++;
    responsesCreated += responses.length;
  }

  console.log(
    `✓ Created ${submissionsCreated} submissions with ${responsesCreated} responses`,
  );

  // 4. Display summary
  console.log("\n🎉 Database seeding completed!");
  console.log("\n📊 Summary:");
  console.log(`   - Users: 1`);
  console.log(`   - Forms: ${seedForms.length}`);
  console.log(
    `     • Published: ${seedForms.filter((f) => f.status === "published").length}`,
  );
  console.log(
    `     • Draft: ${seedForms.filter((f) => f.status === "draft").length}`,
  );
  console.log(`   - Form Blocks: ${Object.values(seedBlocks).flat().length}`);
  console.log(`   - Submissions: ${submissionsCreated}`);
  console.log(`   - Field Responses: ${responsesCreated}`);

  console.log("\n📈 Form Metrics:");
  const formsWithMetrics = await prisma.form.findMany({
    select: {
      title: true,
      views: true,
      starts: true,
      completions: true,
      submitAttempts: true,
      _count: {
        select: { submissions: true },
      },
    },
  });

  formsWithMetrics.forEach((form) => {
    if (form.views > 0 || form._count.submissions > 0) {
      console.log(
        `   "${form.title}": ${form.views} views, ${form.starts} starts, ${form.completions} completions, ${form.submitAttempts} attempts, ${form._count.submissions} submissions`,
      );
    }
  });

  console.log("\n💡 Next steps:");
  console.log("   • Run 'npm run dev' to start the application");
  console.log("   • View forms at http://localhost:3000/forms");
  console.log("   • Run 'npx prisma studio' to inspect seeded data");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
