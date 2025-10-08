import { User } from "../validation/authSchemas";

export const mockUsers: User[] = [
  {
    email: "admin@example.com",
    name: "Admin User",
    occupation: "Administrator",
    introduction: "I am the admin user.",
  },
  {
    email: "user@example.com",
    name: "Regular User",
    occupation: "User",
    introduction: "I am a regular user.",
  },
  {
    email: "test@example.com",
    name: "Test User",
    occupation: "Tester",
    introduction: "I am a test user.",
  },
];

export const mockCredentials = {
  "admin@example.com": "admin123",
  "user@example.com": "user123",
  "test@example.com": "test123",
};
