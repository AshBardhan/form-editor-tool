/**
 * Admin Users Page
 * User management dashboard
 */

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UsersTable } from "@/components/admin/UsersTable";

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
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <p className="text-gray-600 mt-1">
          Manage users, roles, and permissions
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-600">Total Users</div>
            <div className="text-2xl font-bold text-gray-900">
              {users.length}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Admins</div>
            <div className="text-2xl font-bold text-gray-900">
              {users.filter((u) => u.role === "ADMIN").length}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Clients</div>
            <div className="text-2xl font-bold text-gray-900">
              {users.filter((u) => u.role === "CLIENT").length}
            </div>
          </div>
        </div>
      </div>

      <UsersTable users={users} />
    </div>
  );
}
