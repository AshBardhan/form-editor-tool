/**
 * Admin Dashboard Home
 * Redirects to users page
 */

import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/users");
}
