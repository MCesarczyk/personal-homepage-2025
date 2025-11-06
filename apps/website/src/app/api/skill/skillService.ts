import { skillsListSchema } from "@/app/api/skill/skillSchemas";
import { validateData } from "@/lib/validation/utils";
import { baseUrl } from "@/shared/constants";

export const skillService = {
  getSkills: async () => {
    const skillResponse = await fetch(`${baseUrl}/api/skill`, { next: { revalidate: 60 } });
    const skillsData = await skillResponse.json();
    if (skillsData.message !== "Skill data") {
      console.error(skillsData.message);
    }

    const validatedResponse = validateData(skillsListSchema, skillsData.data);

    if (!validatedResponse.success) {
      console.error("Skill data validation failed:", validatedResponse.errors);
    }

    return { skillsData: validatedResponse };
  },
};
