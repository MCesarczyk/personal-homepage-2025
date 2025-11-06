import { userTechnologiesListSchema } from "@/app/api/technology/technologySchemas";
import { validateData } from "@/lib/validation/utils";
import { baseUrl } from "@/shared/constants";

export const technologyService = {
  getTechnologies: async () => {
    const technologyResponse = await fetch(`${baseUrl}/api/technology`, { next: { revalidate: 60 } });
    const technologiesData = await technologyResponse.json();
    if (technologiesData.message !== "Technology data") {
      console.error(technologiesData.message);
    }

    const validatedResponse = validateData(userTechnologiesListSchema, technologiesData.data);

    if (!validatedResponse.success) {
      console.error("Technology data validation failed:", validatedResponse.errors);
    }

    return { technologiesData: validatedResponse };
  },
};
