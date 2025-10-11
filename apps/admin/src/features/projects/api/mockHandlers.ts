import { http, HttpResponse } from "msw";

import { mockProjects } from "./mockData";
import { type Project } from "../validation/projectSchemas";

const projects = [...mockProjects];

export const projectsHandlers = [
  http.get("*/api/v1/project", () => {
    return HttpResponse.json(projects, { status: 200 });
  }),

  http.get("*/api/v1/project/:id", ({ params }) => {
    const { id } = params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(project, { status: 200 });
  }),

  http.post("*/api/v1/project", async ({ request }) => {
    const data = (await request.json()) as Omit<Project, "id" | "createdAt" | "updatedAt">;

    const newProject: Project = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    projects.push(newProject);
    return HttpResponse.json(newProject, { status: 201 });
  }),

  http.patch("*/api/v1/project/:id", async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<Project>;

    const projectIndex = projects.findIndex((p) => p.id === id);
    if (projectIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...updates,
      updatedAt: new Date(),
    };

    return HttpResponse.json(projects[projectIndex], { status: 200 });
  }),

  http.delete("*/api/v1/project/:id", ({ params }) => {
    const { id } = params;
    const projectIndex = projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    projects.splice(projectIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
