import { FormList } from "@/lib/types/form";

export const sampleFormList: FormList = [
  {
    id: "123",
    title: "Profile Settings Form",
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
    status: "draft",
    metrics: {
      fields: 8,
    },
  },
];
