import { describe, it, expect } from "vitest";

import type { GenerateKeyRequest } from "../types";
import { mockApiKeys } from "./mockData";
import { apiKeysService } from "./apiKeysService";
import { server } from "../../../services/msw/server";
import { http } from "msw";

describe("ApiKeysService", () => {
  it("fetches API keys and parses date fields", async () => {
    const keys = await apiKeysService.getApiKeys();
    expect(Array.isArray(keys)).toBe(true);
    expect(keys.length).toBeGreaterThan(0);
    expect(keys[0]).toMatchObject({
      id: expect.any(String),
      userId: "user-123",
      description: expect.any(String),
    });
    expect(keys[0].createdAt instanceof Date).toBe(true);
    expect(keys[0].lastUsedAt === null || keys[0].lastUsedAt instanceof Date).toBe(true);
    expect(keys[0].expiresAt === null || keys[0].expiresAt instanceof Date).toBe(true);
  });

  it("throws when API keys fetch fails", async () => {
    server.use(http.get("*/api-key/list", () => new Response(null, { status: 500 })));
    await expect(apiKeysService.getApiKeys()).rejects.toThrow("Failed to fetch API keys");
  });

  it("generates a new API key", async () => {
    const request: GenerateKeyRequest = {
      description: "New API Key for Testing",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    };
    const response = await apiKeysService.generateApiKey(request);
    expect(response.apiKey).toMatch(/^sk_live_/);
    expect(response.message).toMatch(/successfully/i);
  });

  it("throws when API key generation fails", async () => {
    server.use(http.post("*/api-key/generate", () => new Response(null, { status: 500 })));
    await expect(apiKeysService.generateApiKey({ description: "Test", expiresAt: null })).rejects.toThrow(
      "Failed to generate API key",
    );
  });

  it("revokes an existing API key", async () => {
    const validKeyId = mockApiKeys.find((k) => k.isActive)?.id || "1";
    const response = await apiKeysService.deleteApiKey(validKeyId);
    expect(response.message).toContain("revoked");
  });

  it("throws when revoking a non-existent API key", async () => {
    const invalidKeyId = "non-existent-key";
    await expect(apiKeysService.deleteApiKey(invalidKeyId)).rejects.toThrow("Failed to delete API key");
  });

  it("rotates an existing API key", async () => {
    const validKeyId = mockApiKeys.find((k) => k.isActive)?.id || "1";
    const response = await apiKeysService.rotateApiKey(validKeyId);
    expect(response.apiKey).toMatch(/^sk_live_/);
    expect(response.message).toContain("rotated");
  });

  it("throws when rotating a non-existent API key", async () => {
    const invalidKeyId = "non-existent-key";
    await expect(apiKeysService.rotateApiKey(invalidKeyId)).rejects.toThrow("Failed to rotate API key");
  });
});
