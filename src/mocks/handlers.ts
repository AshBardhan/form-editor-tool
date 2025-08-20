import { sampleForm } from "@/data/sample-form-data";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/form/:id", () => {
    return HttpResponse.json(sampleForm);
  }),
];
