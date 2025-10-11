import { authorizedFetchService } from "../../../services/authorizedFetchService";
import { API_URL, API_PREFIX } from "../../../shared/constants/apiUrl";
import { AUTH_URLS } from "./authUrls";
import { validateData } from "../../../shared/utils/validation";
import {
  type LoginResponse,
  loginResponseSchema,
  type LoginCredentials,
  loginCredentialsSchema,
  type RegisterData,
  registerDataSchema,
  type RegisterResponse,
  registerResponseSchema,
  type User,
  userSchema,
} from "../validation/authSchemas";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const validationResult = validateData(loginCredentialsSchema, credentials);
    if (!validationResult.success) {
      throw new Error(`Invalid login data: ${validationResult.errors.issues[0]?.message}`);
    }

    const response = await fetch(`${API_URL}${API_PREFIX}${AUTH_URLS.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationResult.data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const responseData = await response.json();
    const validatedResponse = validateData(loginResponseSchema, responseData);

    if (!validatedResponse.success) {
      throw new Error("Invalid response format from server");
    }

    return validatedResponse.data;
  },

  register: async (data: RegisterData): Promise<RegisterResponse> => {
    const validationResult = validateData(registerDataSchema, data);
    if (!validationResult.success) {
      throw new Error(`Invalid registration data: ${validationResult.errors.issues[0]?.message}`);
    }

    const validatedRegisterData = {
      name: validationResult.data.name,
      email: validationResult.data.email,
      password: validationResult.data.password,
      occupation: validationResult.data.occupation,
      introduction: validationResult.data.introduction,
    };

    const response = await fetch(`${API_URL}${API_PREFIX}${AUTH_URLS.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedRegisterData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const responseData = await response.json();

    const validatedResponse = validateData(registerResponseSchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid response format from server");
    }

    return validatedResponse.data;
  },

  logout: async (): Promise<void> => {
    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${AUTH_URLS.logout}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${AUTH_URLS.me}`);

    if (!response.ok) {
      throw new Error("Failed to get current user");
    }

    const responseData = await response.json();
    const validatedResponse = validateData(userSchema, responseData);
    if (!validatedResponse.success) {
      throw new Error("Invalid user data format from server");
    }

    return validatedResponse.data;
  },
};
