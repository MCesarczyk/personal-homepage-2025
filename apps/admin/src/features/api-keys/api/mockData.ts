import type { ApiKey } from "../types";

export const mockApiKeys: ApiKey[] = [
  {
    id: "1",
    description: "Production API Key",
    isActive: true,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    lastUsedAt: new Date("2024-10-20T14:22:00Z"),
    expiresAt: null,
  },
  {
    id: "2",
    description: "Development Environment",
    isActive: true,
    createdAt: new Date("2024-03-22T08:15:00Z"),
    lastUsedAt: new Date("2024-10-25T09:45:00Z"),
    expiresAt: new Date("2025-12-31T23:59:59Z"),
  },
  {
    id: "3",
    description: "Legacy Integration",
    isActive: false,
    createdAt: new Date("2023-08-10T12:00:00Z"),
    lastUsedAt: new Date("2024-06-15T16:30:00Z"),
    expiresAt: null,
  },
  {
    id: "4",
    description: "Temporary Test Key",
    isActive: true,
    createdAt: new Date("2024-09-01T14:20:00Z"),
    lastUsedAt: null,
    expiresAt: new Date("2024-10-01T23:59:59Z"),
  },
];

export const generateMockApiKey = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let key = "sk_live_";
  for (let i = 0; i < 48; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};
