import { userTechnologiesListSchema } from "@/app/api/technology/technologySchemas";
import { fetchFromAPI } from "@/lib/api-client";
import { validateData } from "@/lib/validation/utils";

export const technologyService = {
  getTechnologies: async () => {
    const technologiesData = await fetchFromAPI(`/user-public/technology`, { revalidate: 60 });

    const validatedResponse = validateData(userTechnologiesListSchema, technologiesData);

    if (!validatedResponse.success) {
      console.error("Technology data validation failed:", validatedResponse.errors);
    }

    return { technologiesData: validatedResponse };
  },
};
