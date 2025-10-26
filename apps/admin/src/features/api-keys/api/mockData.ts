import type { ApiKey } from "../types";

export const mockApiKeys: ApiKey[] = [
  {
    id: "1",
    userId: "user-123",
    keyHash: "sk_test_abc123def456ghi789jkl012mno345pqr",
    description: "Production API Key",
    isActive: true,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    lastUsedAt: new Date("2024-10-20T14:22:00Z"),
    expiresAt: null,
  },
  {
    id: "2",
    userId: "user-123",
    keyHash: "sk_test_xyz789uvw456rst123opq890lmn567efg",
    description: "Development Environment",
    isActive: true,
    createdAt: new Date("2024-03-22T08:15:00Z"),
    lastUsedAt: new Date("2024-10-25T09:45:00Z"),
    expiresAt: new Date("2025-12-31T23:59:59Z"),
  },
  {
    id: "3",
    userId: "user-123",
    keyHash: "sk_test_old123abc456def789ghi012jkl345mno",
    description: "Legacy Integration",
    isActive: false,
    createdAt: new Date("2023-08-10T12:00:00Z"),
    lastUsedAt: new Date("2024-06-15T16:30:00Z"),
    expiresAt: null,
  },
  {
    id: "4",
    userId: "user-123",
    keyHash: "sk_test_exp456def789ghi012jkl345mno678pqr",
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
