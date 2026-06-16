import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

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
      <h2 className="text-2xl font-bold mb-6">Database Status</h2>

      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold">❌ Connection Failed</p>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      ) : (
        <>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
            <p className="text-green-800 font-semibold">
              Connected Successfully
            </p>
            <dl className="mt-2 space-y-1 text-sm text-green-700">
              <div>
                <span className="font-medium">Latency:</span> {stats?.latency}ms
              </div>
              <div>
                <span className="font-medium">Version:</span> {stats?.version}
              </div>
            </dl>
          </div>

          <h2 className="text-2xl font-bold mb-6">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 capitalize">Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.users}</p>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 capitalize">Forms</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.forms}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
