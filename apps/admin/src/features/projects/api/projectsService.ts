import { authorizedFetchService } from "../../../services/authorizedFetchService";
import { API_URL, API_PREFIX } from "../../../shared/constants/apiUrl";
import { PROJECTS_URLS } from "./projectsUrls";
import { validateData } from "../../../shared/utils/validation";
import {
  createProjectSchema,
  Project,
  projectSchema,
  projectsListSchema,
  updateProjectSchema,
} from "../validation/projectSchemas";

export const projectsService = {
  getProjects: async (): Promise<Project[]> => {
    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${PROJECTS_URLS.getProjects}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const responseData = await response.json();
    const validatedResponse = validateData(projectsListSchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid projects data format from server");
    }

    return validatedResponse.data;
  },

  getProject: async (id: string): Promise<Project> => {
    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${PROJECTS_URLS.getProject(id)}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch project with id: ${id}`);
    }

    const responseData = await response.json();
    const validatedResponse = validateData(projectSchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid project data format from server");
    }

    return validatedResponse.data;
  },

  createProject: async (
    data: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ): Promise<Project> => {
    const validationResult = validateData(createProjectSchema, data);
    if (!validationResult.success) {
      throw new Error(
        `Invalid project data: ${validationResult.errors.issues[0]?.message}`,
      );
    }

    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${PROJECTS_URLS.createProject}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    const responseData = await response.json();
    const validatedResponse = validateData(projectSchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid project response format from server");
    }

    return validatedResponse.data;
  },

  updateProject: async (
    id: string,
    updates: Partial<Project>,
  ): Promise<Project> => {
    const validationResult = validateData(updateProjectSchema, updates);
    if (!validationResult.success) {
      throw new Error(
        `Invalid project update data: ${validationResult.errors.issues[0]?.message}`,
      );
    }

    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${PROJECTS_URLS.updateProject(id)}`,
      {
        method: "PATCH",
        body: JSON.stringify(updates),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to update project with id: ${id}`);
    }

    const responseData = await response.json();
    const validatedResponse = validateData(projectSchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid project response format from server");
    }

    return validatedResponse.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${PROJECTS_URLS.deleteProject(id)}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to delete project with id: ${id}`);
    }
  },
};
