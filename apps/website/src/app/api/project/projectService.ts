import { projectsListSchema } from "@/app/api/project/projectSchemas";
import { fetchFromAPI } from "@/lib/api-client";
import { validateData } from "@/lib/validation/utils";

export const projectService = {
  getProjects: async () => {
    let projectsData = null;
    try {
      projectsData = await fetchFromAPI(`/project-public`, { revalidate: 60 });
    } catch (error) {
      console.warn("Failed to fetch during build:", error);
      projectsData = { fallback: true };
    }

    const validatedResponse = validateData(projectsListSchema, projectsData);

    if (!validatedResponse.success) {
      console.error("Project data validation failed:", validatedResponse.errors);
    }

    return { projectsData: validatedResponse };
  },
};
