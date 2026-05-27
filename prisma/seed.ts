import { PrismaClient, FormTheme, FormStatus } from "@prisma/client";
import { FormBlock } from "../src/lib/types/form";
import { sampleLightForm, sampleDarkForm } from "../src/mocks/data/sampleForms";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data (optional - comment out if you want to preserve data)
  console.log("🧹 Cleaning existing data...");
  await prisma.formFieldResponse.deleteMany();
  await prisma.formSubmission.deleteMany();
  await prisma.formBlock.deleteMany();
  await prisma.form.deleteMany();
  await prisma.user.deleteMany();

  // Create default user (CLIENT role)
  console.log("👤 Creating default user...");
  const defaultUser = await prisma.user.create({
    data: {
      email: "demo@formkit.app",
      name: "Demo User",
      role: "CLIENT",
    },
  });
  console.log(`✓ Created user: ${defaultUser.email}`);

  // Create sample forms with blocks
  console.log("📝 Creating sample forms...");

  const lightForm = await prisma.form.create({
    data: {
      id: sampleLightForm.id,
      title: sampleLightForm.title,
      description: sampleLightForm.description || null,
      theme: sampleLightForm.theme as FormTheme,
      status: FormStatus.published,
      slug: sampleLightForm.slug || null,
      userId: defaultUser.id,
      publishedAt: new Date(),
      blocks: {
        create: sampleLightForm.blocks.map((block: FormBlock, idx: number) => ({
          id: block.id,
          type: block.type,
          name: block.name,
          props: block.props,
          order: idx,
        })),
      },
    },
    include: { blocks: true },
  });
  console.log(
    `✓ Created form: "${lightForm.title}" with ${lightForm.blocks.length} blocks`,
  );

  const darkForm = await prisma.form.create({
    data: {
      id: sampleDarkForm.id,
      title: sampleDarkForm.title,
      description: sampleDarkForm.description || null,
      theme: sampleDarkForm.theme as FormTheme,
      status: FormStatus.draft,
      slug: sampleDarkForm.slug || null,
      userId: defaultUser.id,
      blocks: {
        create: sampleDarkForm.blocks.map((block: FormBlock, idx: number) => ({
          id: block.id,
          type: block.type,
          name: block.name,
          props: block.props,
          order: idx,
        })),
      },
    },
    include: { blocks: true },
  });
  console.log(
    `✓ Created form: "${darkForm.title}" with ${darkForm.blocks.length} blocks`,
  );

  console.log("\n✅ Seed completed successfully!");
  console.log(`\n📊 Summary:`);
  console.log(`  - Users: 1`);
  console.log(`  - Forms: 2 (1 published, 1 draft)`);
  console.log(
    `  - Blocks: ${lightForm.blocks.length + darkForm.blocks.length}`,
  );
  console.log(`\n🚀 Ready to start development!`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
