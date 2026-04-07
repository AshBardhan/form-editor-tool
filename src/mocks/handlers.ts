import { sampleDarkForm, sampleLightForm } from "@/mocks/data/sample-form-data";
import { sampleFormList } from "@/mocks/data/sample-form-list";
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/forms", async () => {
    await delay(1000);
    return HttpResponse.json(sampleFormList);
  }),
  http.get("*/api/form/:id", async ({ params }) => {
    await delay(2000);

    const { id } = params;

    switch (id) {
      case "123":
        return HttpResponse.json(sampleLightForm, { status: 200 });
      case "666":
        return HttpResponse.json(sampleDarkForm, { status: 200 });
      default:
        return HttpResponse.json(
          { message: `Invalid ID: ${id}` },
          { status: 404 },
        );
    }
  }),
];
