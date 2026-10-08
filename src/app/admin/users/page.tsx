/**
 * Admin Users Page
 * User management dashboard
 */

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UsersTable } from "@/components/admin/UsersTable";
import { AppText } from "@/design-system/app/AppText";
import { AppMetric } from "@/design-system/app/AppMetric";

async function getUsers() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/forbidden");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      _count: {
        select: {
          forms: true,
          sessions: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return users;
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="mb-6">
        <AppText variant="h2">User Management</AppText>
        <AppText variant="p" className="mt-1 text-app-fg-muted">
          Manage users, roles, and permissions
        </AppText>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <AppMetric value={users.length} label="Total Users" />
          <AppMetric
            value={users.filter((u) => u.role === "ADMIN").length}
            label="Admins"
          />
          <AppMetric
            value={users.filter((u) => u.role === "CLIENT").length}
            label="Clients"
          />
        </div>
      </div>

      <UsersTable users={users} />
    </div>
  );
}
