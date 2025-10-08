import { http, HttpResponse } from "msw";

import { mockTechnologies, mockUserTechnologies } from "./mockData";
import { UserTechnology } from "../validation/technologySchemas";

const technologies = [...mockTechnologies];
const userTechnologies = [...mockUserTechnologies];

export const technologiesHandlers = [
  http.get("*/api/v1/technology", () => {
    return HttpResponse.json(technologies, { status: 200 });
  }),

  http.get("*/api/v1/user/technology", () => {
    return HttpResponse.json(userTechnologies, { status: 200 });
  }),

  http.get("*/api/v1/user/technology/:id", ({ params }) => {
    const { id } = params;
    const technology = userTechnologies.find((t) => t.technologyId === id);

    if (!technology) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(technology, { status: 200 });
  }),

  http.post("*/api/v1/user/technology", async ({ request }) => {
    const data = (await request.json()) as UserTechnology;

    const newTechnology: UserTechnology = {
      content: data.content,
      rating: data.rating,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      technologyId: data.technologyId,
    };

    userTechnologies.push(newTechnology);
    return HttpResponse.json(newTechnology, { status: 201 });
  }),

  http.patch("*/api/v1/user/technology/:id", async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<UserTechnology>;

    const technologyIndex = userTechnologies.findIndex(
      (t) => t.technologyId === id,
    );
    if (technologyIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    userTechnologies[technologyIndex] = {
      ...userTechnologies[technologyIndex],
      ...updates,
    };

    return HttpResponse.json(userTechnologies[technologyIndex], {
      status: 200,
    });
  }),

  http.delete("*/api/v1/user/technology/:id", ({ params }) => {
    const { id } = params;
    const technologyIndex = userTechnologies.findIndex(
      (t) => t.technologyId === id,
    );

    if (technologyIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    technologies.splice(technologyIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
