import { sampleForm } from "@/data/sample-form-data";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/user", () => {
    return HttpResponse.json(sampleForm);
  }),
];
