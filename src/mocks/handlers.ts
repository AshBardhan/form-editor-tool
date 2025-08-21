import { sampleForm } from "@/data/sample-form-data";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/form/:id", async () => {
    await delay(2000);
    return HttpResponse.json(sampleForm);
  }),
];
