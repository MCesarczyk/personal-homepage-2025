import { skillsListSchema } from "@/app/api/skill/skillSchemas";
import { fetchFromAPI } from "@/lib/api-client";
import { validateData } from "@/lib/validation/utils";

export const skillService = {
  getSkills: async () => {
    let skillsData = null;
    try {
      skillsData = await fetchFromAPI(`/skill-public`, { revalidate: 60 });
    } catch (error) {
      console.warn("Failed to fetch during build:", error);
      skillsData = { fallback: true };
    }

    const validatedResponse = validateData(skillsListSchema, skillsData);

    if (!validatedResponse.success) {
      console.error("Skill data validation failed:", validatedResponse.errors);
    }

    return { skillsData: validatedResponse };
  },
};
