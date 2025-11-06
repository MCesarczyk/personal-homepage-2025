import { authorizedFetchService } from "../../../services/authorizedFetchService";
import { API_PREFIX, API_URL } from "../../../shared/constants/apiUrl";
import type { ApiKey, GenerateKeyRequest, GenerateKeyResponse, DeleteKeyResponse, RotateKeyResponse } from "../types";
import { API_KEYS_URLS } from "./apiKeysUrls";

class ApiKeysService {
  async getApiKeys(): Promise<ApiKey[]> {
    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${API_KEYS_URLS.LIST}`);

    if (!response.ok) {
      throw new Error("Failed to fetch API keys");
    }

    const data = await response.json();
    return data.map((key: ApiKey) => ({
      ...key,
      createdAt: new Date(key.createdAt),
      lastUsedAt: key.lastUsedAt ? new Date(key.lastUsedAt) : null,
      expiresAt: key.expiresAt ? new Date(key.expiresAt) : null,
    }));
  }

  async generateApiKey(request: GenerateKeyRequest): Promise<GenerateKeyResponse> {
    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${API_KEYS_URLS.GENERATE}`, {
      method: "POST",
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Failed to generate API key");
    }

    return response.json();
  }

  async deleteApiKey(keyId: string): Promise<DeleteKeyResponse> {
    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${API_KEYS_URLS.REVOKE(keyId)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete API key");
    }

    return response.json();
  }

  async rotateApiKey(keyId: string): Promise<RotateKeyResponse> {
    const response = await authorizedFetchService(`${API_URL}${API_PREFIX}${API_KEYS_URLS.ROTATE(keyId)}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to rotate API key");
    }

    return response.json();
  }
}

export const apiKeysService = new ApiKeysService();
