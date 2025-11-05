import { baseUrl } from "@/shared/constants";

export const projectService = {
  getProjects: async () => {
    const projectResponse = await fetch(`${baseUrl}/api/project`, { next: { revalidate: 60 } });
    const projectsData = await projectResponse.json();
    if (projectsData.message !== "Project data") {
      console.error(projectsData.message);
    }
    return { projectsData };
  },
};
