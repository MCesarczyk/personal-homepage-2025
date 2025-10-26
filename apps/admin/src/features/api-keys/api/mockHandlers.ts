import { http, HttpResponse } from "msw";

import type { ApiKey, GenerateKeyRequest } from "../types";
import { mockApiKeys, generateMockApiKey } from "./mockData";

const apiKeysStore: ApiKey[] = [...mockApiKeys];

export const apiKeyHandlers = [
  http.get("*/api-key/list", () => {
    return HttpResponse.json(apiKeysStore);
  }),

  http.post<never, GenerateKeyRequest>("*/api-key/generate", async ({ request }) => {
    const body = await request.json();

    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      userId: "user-123",
      keyHash: generateMockApiKey(),
      description: body.description,
      isActive: true,
      createdAt: new Date(),
      lastUsedAt: null,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    };

    apiKeysStore.push(newKey);

    return HttpResponse.json({
      apiKey: newKey.keyHash,
      message: "API key generated successfully",
    });
  }),

  http.delete("*/api-key/:keyId", ({ params }) => {
    const { keyId } = params;
    const keyIndex = apiKeysStore.findIndex((key) => key.id === keyId);

    if (keyIndex === -1) {
      return HttpResponse.json({ message: "API key not found" }, { status: 404 });
    }

    apiKeysStore[keyIndex] = {
      ...apiKeysStore[keyIndex],
      isActive: false,
    };

    return HttpResponse.json({
      message: "API key revoked successfully",
    });
  }),

  http.post("*/api-key/:keyId/rotate", ({ params }) => {
    const { keyId } = params;
    const keyIndex = apiKeysStore.findIndex((key) => key.id === keyId);

    if (keyIndex === -1) {
      return HttpResponse.json({ message: "API key not found" }, { status: 404 });
    }

    const oldKey = apiKeysStore[keyIndex];
    apiKeysStore[keyIndex] = {
      ...oldKey,
      isActive: false,
    };

    const newKeyHash = generateMockApiKey();
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      userId: oldKey.userId,
      keyHash: newKeyHash,
      description: oldKey.description,
      isActive: true,
      createdAt: new Date(),
      lastUsedAt: null,
      expiresAt: oldKey.expiresAt,
    };

    apiKeysStore.push(newKey);

    return HttpResponse.json({
      apiKey: newKeyHash,
      message: "API key rotated successfully",
    });
  }),
];
