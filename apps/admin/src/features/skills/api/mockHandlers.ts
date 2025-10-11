import { http, HttpResponse } from "msw";

import { mockSkills } from "./mockData";
import { type Skill, type SkillState } from "../validation/skillSchemas";

const skills = [...mockSkills];

export const skillsHandlers = [
  http.get("*/api/v1/skill", () => {
    return HttpResponse.json(skills, { status: 200 });
  }),

  http.get("*/api/v1/skill/:id", ({ params }) => {
    const { id } = params;
    const skill = skills.find((s) => s.id === id);

    if (!skill) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(skill, { status: 200 });
  }),

  http.post("*/api/v1/skill", async ({ request }) => {
    const data = (await request.json()) as {
      content: string;
      state: SkillState;
    };

    const newSkill: Skill = {
      id: Date.now().toString(),
      content: data.content,
      state: data.state,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    skills.push(newSkill);
    return HttpResponse.json(newSkill, { status: 201 });
  }),

  http.patch("*/api/v1/skill/:id", async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<Skill>;

    const skillIndex = skills.findIndex((s) => s.id === id);
    if (skillIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    skills[skillIndex] = {
      ...skills[skillIndex],
      ...updates,
      updatedAt: new Date(),
    };

    return HttpResponse.json(skills[skillIndex], { status: 200 });
  }),

  http.delete("*/api/v1/skill/:id", ({ params }) => {
    const { id } = params;
    const skillIndex = skills.findIndex((s) => s.id === id);

    if (skillIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    skills.splice(skillIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
