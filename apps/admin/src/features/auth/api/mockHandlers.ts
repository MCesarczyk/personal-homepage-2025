import { http, HttpResponse } from "msw";

import { mockUsers, mockCredentials } from "./mockData";
import {
  type User,
  type LoginCredentials,
  type RegisterData,
  type LoginResponse,
  type RefreshTokenResponse,
} from "../validation/authSchemas";

const users = [...mockUsers];

export const authHandlers = [
  http.post("*/api/v1/auth/login", async ({ request }) => {
    const credentials = (await request.json()) as LoginCredentials;

    const user = users.find((u) => u.email === credentials.email);

    if (!user) {
      return HttpResponse.json({ message: "Invalid email or password", field: "email" }, { status: 401 });
    }

    const expectedPassword = mockCredentials[credentials.email as keyof typeof mockCredentials];
    if (credentials.password !== expectedPassword) {
      return HttpResponse.json({ message: "Invalid email or password", field: "password" }, { status: 401 });
    }

    const response: LoginResponse = {
      accessToken: `mock-jwt-token-${user.name}`,
      refreshToken: `mock-jwt-refresh-token-${user.name}`,
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  http.post("*/api/v1/auth/register", async ({ request }) => {
    const data = (await request.json()) as RegisterData;

    const existingUser = users.find((u) => u.email === data.email);
    if (existingUser) {
      return HttpResponse.json({ message: "User with this email already exists", field: "email" }, { status: 409 });
    }

    const newUser: User = {
      email: data.email,
      name: data.name,
      occupation: "Developer",
      introduction: "Hello, I am a new user.",
    };

    users.push(newUser);

    const response: LoginResponse = {
      ...newUser,
      accessToken: `mock-jwt-token-${newUser.name}`,
      refreshToken: `mock-jwt-refresh-token-${newUser.name}`,
    };

    return HttpResponse.json(response, { status: 201 });
  }),

  http.post("*/api/v1/auth/logout", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.get("*/api/v1/auth/me", ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const userName = token.replace("mock-jwt-token-", "");

    const user = users.find((u) => u.name === userName);
    if (!user) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }

    return HttpResponse.json(user, { status: 200 });
  }),

  http.post("*/api/v1/auth/refresh", ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const userName = token.replace("mock-jwt-token-", "");

    const user = users.find((u) => u.name === userName);
    if (!user) {
      return HttpResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const response: RefreshTokenResponse = {
      accessToken: `mock-jwt-token-${user.name}-refreshed`,
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  http.get("*/api/v1/user/profile", () => {
    return HttpResponse.json(
      {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        occupation: "Tester",
        introduction: "I am a test user.",
      },
      { status: 200 },
    );
  }),
];
