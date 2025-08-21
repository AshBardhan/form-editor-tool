import { sampleForm } from "@/data/sample-form-data";
import { sampleFormList } from "@/data/sample-form-list";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/forms", async () => {
    await delay(1000);
    return HttpResponse.json(sampleFormList);
  }),
  http.get("*/api/form/:id", async () => {
    await delay(2000);
    return HttpResponse.json(sampleForm);
  }),
];
