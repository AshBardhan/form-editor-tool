"use client";

/**
 * Users Table Component
 * Displays and manages all users
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBadge } from "@/design-system/app/AppBadge";
import {
  AppModal,
  AppModalContent,
  AppModalDescription,
  AppModalFooter,
  AppModalHeader,
  AppModalTitle,
} from "@/design-system/app/AppModal";
import { AppButton } from "@/design-system/app/AppButton";
import { AppText } from "@/design-system/app/AppText";

interface User {
  id: number;
  email: string;
  name: string | null;
  role: string;
  emailVerified: Date | null;
  createdAt: Date;
  _count: {
    forms: number;
    sessions: number;
  };
}

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedUser) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowDeleteModal(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleRole = async (user: User) => {
    const newRole = user.role === "ADMIN" ? "CLIENT" : "ADMIN";

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Role update failed:", error);
    }
  };

  return (
    <>
      <table className="w-full rounded-lg border border-app-border-subtle overflow-hidden">
        <thead className="border-b border-app-border-subtle bg-app-field-placeholder text-app-field/80 text-xs font-semibold uppercase">
          <tr>
            <th className="px-4 py-3 text-left">User</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Forms</th>
            <th className="px-4 py-3 text-left">Sessions</th>
            <th className="px-4 py-3 text-left">Joined</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-app-surface even:bg-app-surface-muted hover:bg-app-surface-strong text-xs"
            >
              <td className="px-4 py-3">
                <AppText variant="h6">{user.name || "—"}</AppText>
                <AppText className="!text-xs text-app-fg-muted">
                  {user.email}
                </AppText>
              </td>
              <td className="px-4 py-3">
                <AppBadge
                  label={user.role}
                  variant={user.role === "ADMIN" ? "error" : "info"}
                  size="sm"
                />
              </td>
              <td className="px-4 py-3">{user._count.forms ?? 0}</td>
              <td className="px-4 py-3">{user._count.sessions ?? 0}</td>
              <td className="px-4 py-3">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center gap-2 justify-end">
                  <AppButton
                    variant="outline"
                    color="secondary"
                    size="sm"
                    onClick={() => handleToggleRole(user)}
                  >
                    {user.role === "ADMIN" ? "Demote" : "Promote"}
                  </AppButton>
                  <AppButton
                    variant="solid"
                    color="negative"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </AppButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <AppModal
        type="alert"
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
      >
        <AppModalContent size="sm">
          <AppModalHeader>
            <AppModalTitle>Delete User</AppModalTitle>
            <AppModalDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedUser?.email}</strong>?
            </AppModalDescription>
          </AppModalHeader>
          <p className="p-6 text-sm text-app-error">
            This will permanently delete the user and all their forms,
            submissions, and data.
          </p>
          <AppModalFooter>
            <AppButton
              variant="outline"
              color="secondary"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Cancel
            </AppButton>
            <AppButton
              variant="solid"
              color="negative"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete User"}
            </AppButton>
          </AppModalFooter>
        </AppModalContent>
      </AppModal>
    </>
  );
}
