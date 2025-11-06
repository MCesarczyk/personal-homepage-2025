import { projectsListSchema } from "@/app/api/project/projectSchemas";
import { validateData } from "@/lib/validation/utils";
import { baseUrl } from "@/shared/constants";

export const projectService = {
  getProjects: async () => {
    const projectResponse = await fetch(`${baseUrl}/api/project`, { next: { revalidate: 60 } });
    const projectsData = await projectResponse.json();
    if (projectsData.message !== "Project data") {
      console.error(projectsData.message);
    }

    const validatedResponse = validateData(projectsListSchema, projectsData.data);

    if (!validatedResponse.success) {
      console.error("Project data validation failed:", validatedResponse.errors);
    }

    return { projectsData: validatedResponse };
  },
};
