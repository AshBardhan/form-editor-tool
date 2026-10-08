import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AppText } from "@/design-system/app/AppText";
import { AppMetric } from "@/design-system/app/AppMetric";

interface Stats {
  users: number;
  forms: number;
  version: string;
  latency: number;
}

export default async function TestPage() {
  const isDbTestPageEnabled =
    process.env.NODE_ENV !== "production" ||
    process.env.ENABLE_DB_TEST_PAGE === "true";

  if (!isDbTestPageEnabled) {
    notFound();
  }

  let stats: Stats | null = null;
  let error: string | null = null;

  try {
    const start = Date.now();
    const [userCount, formCount, versionResult] = await Promise.all([
      prisma.user.count(),
      prisma.form.count(),
      prisma.$queryRaw<Array<{ version: string }>>`SELECT version()`,
    ]);
    const latency = Date.now() - start;
    const version = versionResult[0]?.version?.split(" ")[0] || "Unknown";
    stats = {
      users: userCount,
      forms: formCount,
      version,
      latency,
    };
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AppText variant="h2" className="mb-6">
        Database Status
      </AppText>

      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <AppText variant="p" className="font-semibold text-app-error">
            Connection Failed
          </AppText>
          <AppText variant="p" className="mt-1 text-sm text-app-error">
            {error}
          </AppText>
        </div>
      ) : (
        <>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
            <AppText variant="p" className="font-semibold text-app-success">
              Connected Successfully
            </AppText>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <AppMetric value={stats?.latency || 0} label="Latency" />
              <AppMetric value={stats?.version || ""} label="Version" />
            </div>
          </div>

          <AppText variant="h2" className="mb-6">
            Statistics
          </AppText>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AppMetric value={stats?.users || 0} label="Users" />
            <AppMetric value={stats?.forms || 0} label="Forms" />
          </div>
        </>
      )}
    </div>
  );
}
