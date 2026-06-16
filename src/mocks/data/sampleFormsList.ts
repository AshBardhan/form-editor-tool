import { DashboardForm } from "@/lib/types/form";

export const sampleFormList: DashboardForm[] = [
  {
    id: "123",
    title: "Profile Settings Form",
    slug: "profile-settings",
    status: "published",
    metrics: {
      fields: 12,
      submissions: 245,
      completion: "66.7%",
    },
  },
  {
    id: "666",
    title: "Dark Settings Form",
    slug: "dark-settings",
    status: "draft",
    metrics: {
      fields: 8,
    },
  },
];
