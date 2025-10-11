import { authorizedFetchService } from "../../../services/authorizedFetchService";
import { API_URL, API_PREFIX } from "../../../shared/constants/apiUrl";
import { SKILLS_URLS } from "./skillsUrls";
import { validateData } from "../../../shared/utils/validation";
import {
  createSkillSchema,
  type Skill,
  skillSchema,
  skillsListSchema,
  type SkillState,
  updateSkillSchema,
} from "../validation/skillSchemas";

export const skillsService = {
  getSkills: async (): Promise<Skill[]> => {
    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${SKILLS_URLS.getSkills}`);

    if (!response.ok) {
      throw new Error("Failed to fetch skills");
    }

    const responseData = await response.json();
    const validatedResponse = validateData(skillsListSchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid skills data format from server");
    }

    return validatedResponse.data;
  },

  getSkill: async (id: string): Promise<Skill> => {
    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${SKILLS_URLS.getSkill(id)}`, {});

    if (!response.ok) {
      throw new Error(`Failed to fetch skill with id: ${id}`);
    }

    const responseData = await response.json();
    const validatedResponse = validateData(skillSchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid skill data format from server");
    }

    return validatedResponse.data;
  },

  createSkill: async (data: { content: string; state: SkillState }): Promise<Skill> => {
    const validationResult = validateData(createSkillSchema, data);
    if (!validationResult.success) {
      throw new Error(`Invalid skill data: ${validationResult.errors.issues[0]?.message}`);
    }

    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${SKILLS_URLS.createSkill}`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create skill");
    }

    const responseData = await response.json();
    const validatedResponse = validateData(skillSchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid skill response format from server");
    }

    return validatedResponse.data;
  },

  updateSkill: async (id: string, updates: Partial<Skill>): Promise<Skill> => {
    const validationResult = validateData(updateSkillSchema, updates);
    if (!validationResult.success) {
      throw new Error(`Invalid skill update data: ${validationResult.errors.issues[0]?.message}`);
    }

    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${SKILLS_URLS.updateSkill(id)}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update skill with id: ${id}`);
    }

    const responseData = await response.json();
    const validatedResponse = validateData(skillSchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid skill response format from server");
    }

    return validatedResponse.data;
  },

  deleteSkill: async (id: string): Promise<void> => {
    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${SKILLS_URLS.deleteSkill(id)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete skill with id: ${id}`);
    }
  },
};
