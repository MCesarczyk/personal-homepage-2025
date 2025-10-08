import { authorizedFetchService } from "../../../services/authorizedFetchService";
import { API_URL, API_PREFIX } from "../../../shared/constants/apiUrl";
import { TECHNOLOGIES_URLS } from "./technologiesUrls";
import { validateData } from "../../../shared/utils/validation";
import {
  createTechnologySchema,
  technologiesListSchema,
  Technology,
  updateTechnologySchema,
  userTechnologiesListSchema,
  UserTechnology,
  userTechnologySchema,
} from "../validation/technologySchemas";

export const technologiesService = {
  getTechnologies: async (): Promise<Technology[]> => {
    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${TECHNOLOGIES_URLS.getTechnologies}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch technologies");
    }

    const responseData = await response.json();
    const validatedResponse = validateData(
      technologiesListSchema,
      responseData,
    );
    if (!validatedResponse.success) {
      throw new Error("Invalid technologies data format from server");
    }

    return validatedResponse.data;
  },

  getUserTechnologies: async (): Promise<UserTechnology[]> => {
    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${TECHNOLOGIES_URLS.getUserTechnologies}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user technologies");
    }

    const responseData = await response.json();
    const validatedResponse = validateData(
      userTechnologiesListSchema,
      responseData,
    );
    if (!validatedResponse.success) {
      throw new Error("Invalid user technologies data format from server");
    }

    return validatedResponse.data;
  },

  getUserTechnology: async (id: string): Promise<UserTechnology> => {
    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${TECHNOLOGIES_URLS.getUserTechnology(id)}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user technology with id: ${id}`);
    }

    const responseData = await response.json();
    const validatedResponse = validateData(userTechnologySchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid user technology data format from server");
    }

    return validatedResponse.data;
  },

  createUserTechnology: async (data: {
    content: string;
    rating: number;
  }): Promise<UserTechnology> => {
    const validationResult = validateData(createTechnologySchema, data);
    if (!validationResult.success) {
      throw new Error(
        `Invalid user technology data: ${validationResult.errors.issues[0]?.message}`,
      );
    }

    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${TECHNOLOGIES_URLS.createUserTechnology}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create user technology");
    }

    const responseData = await response.json();
    const validatedResponse = validateData(userTechnologySchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid user technology response format from server");
    }

    return validatedResponse.data;
  },

  updateUserTechnology: async (
    id: string,
    updates: Partial<Technology>,
  ): Promise<UserTechnology> => {
    const validationResult = validateData(updateTechnologySchema, updates);
    if (!validationResult.success) {
      throw new Error(
        `Invalid user technology update data: ${validationResult.errors.issues[0]?.message}`,
      );
    }

    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${TECHNOLOGIES_URLS.updateUserTechnology(id)}`,
      {
        method: "PATCH",
        body: JSON.stringify(updates),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to update user technology with id: ${id}`);
    }

    const responseData = await response.json();
    const validatedResponse = validateData(userTechnologySchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid user technology response format from server");
    }

    return validatedResponse.data;
  },

  deleteUserTechnology: async (id: string): Promise<void> => {
    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${TECHNOLOGIES_URLS.deleteUserTechnology(id)}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to delete user technology with id: ${id}`);
    }
  },
};
