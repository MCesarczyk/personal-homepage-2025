import { baseUrl } from "@/shared/constants";

export const skillService = {
  getSkills: async () => {
    const skillResponse = await fetch(`${baseUrl}/api/skill`, { next: { revalidate: 60 } });
    const skillsData = await skillResponse.json();
    if (skillsData.message !== "Skill data") {
      console.error(skillsData.message);
    }
    return { skillsData };
  },
};
