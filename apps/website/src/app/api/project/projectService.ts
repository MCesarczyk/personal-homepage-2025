import { projectsListSchema } from "@/app/api/project/projectSchemas";
import { fetchFromAPI } from "@/lib/api-client";
import { validateData } from "@/lib/validation/utils";

export const projectService = {
  getProjects: async () => {
    const projectsData = await fetchFromAPI(`/project-public`, { revalidate: 60 });

    const validatedResponse = validateData(projectsListSchema, projectsData);

    if (!validatedResponse.success) {
      console.error("Project data validation failed:", validatedResponse.errors);
    }

    return { projectsData: validatedResponse };
  },
};
