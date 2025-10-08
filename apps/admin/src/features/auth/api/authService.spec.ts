import { describe, it, expect } from "vitest";

import { authService } from "./authService";

describe("authService", () => {
  describe("login", () => {
    it("should login with valid credentials", async () => {
      const credentials = {
        email: "admin@example.com",
        password: "admin123",
      };

      const response = await authService.login(credentials);

      expect(response.accessToken).toContain("mock-jwt-token");
      expect(response.refreshToken).toContain("mock-jwt-refresh-token");
    });

    it("should throw error with invalid email", async () => {
      const credentials = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      await expect(authService.login(credentials)).rejects.toThrow(
        "Invalid email or password",
      );
    });

    it("should throw error with invalid password", async () => {
      const credentials = {
        email: "admin@example.com",
        password: "wrongpassword",
      };

      await expect(authService.login(credentials)).rejects.toThrow(
        "Invalid email or password",
      );
    });
  });

  describe("register", () => {
    it("should register new user with valid data", async () => {
      const registerData = {
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
        confirmPassword: "password123",
        occupation: "Developer",
        introduction: "Hello, I am a new user.",
      };

      const response = await authService.register(registerData);

      expect(response.email).toBe(registerData.email);
      expect(response.name).toBe(registerData.name);
      expect(response.occupation).toBe(registerData.occupation);
      expect(response.introduction).toBe(registerData.introduction);
      expect(response.accessToken).toContain("mock-jwt-token");
      expect(response.refreshToken).toContain("mock-jwt-refresh-token");
    });

    it("should throw error when user already exists", async () => {
      const registerData = {
        name: "Existing User",
        email: "admin@example.com", // This email already exists
        password: "password123",
        confirmPassword: "password123",
        occupation: "Developer",
        introduction: "Hello, I am an existing user.",
      };

      await expect(authService.register(registerData)).rejects.toThrow(
        "User with this email already exists",
      );
    });

    it("should throw error when passwords do not match", async () => {
      const registerData = {
        name: "New User",
        email: "newuser2@example.com",
        password: "password123",
        confirmPassword: "differentpassword",
        occupation: "Developer",
        introduction: "Hello, I am a new user.",
      };

      await expect(authService.register(registerData)).rejects.toThrow(
        "Invalid registration data: Passwords don't match",
      );
    });
  });

  describe("logout", () => {
    it("should logout successfully", async () => {
      await expect(authService.logout()).resolves.toBeUndefined();
    });
  });
});
