import { userTechnologiesListSchema } from "@/app/api/technology/technologySchemas";
import { fetchFromAPI } from "@/lib/api-client";
import { validateData } from "@/lib/validation/utils";

export const technologyService = {
  getTechnologies: async () => {
    let technologiesData = null;
    try {
      technologiesData = await fetchFromAPI(`/user-public/technology`, { revalidate: 60 });
    } catch (error) {
      console.warn("Failed to fetch during build:", error);
      technologiesData = { fallback: true };
    }

    const validatedResponse = validateData(userTechnologiesListSchema, technologiesData);

    if (!validatedResponse.success) {
      console.error("Technology data validation failed:", validatedResponse.errors);
    }

    return { technologiesData: validatedResponse };
  },
};
