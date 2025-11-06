import { useState, useEffect } from "react";

import type { ApiKey, GenerateKeyRequest, GenerateKeyResponse } from "./types";
import { apiKeysService } from "./api/apiKeysService";

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadApiKeys = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiKeysService.getApiKeys();
        setApiKeys(data);
      } catch (error) {
        console.error("Failed to load API keys:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    loadApiKeys();
  }, []);

  const generateApiKey = async (request: GenerateKeyRequest): Promise<GenerateKeyResponse> => {
    try {
      const response = await apiKeysService.generateApiKey(request);
      const updatedKeys = await apiKeysService.getApiKeys();
      setApiKeys(updatedKeys);
      return response;
    } catch (error) {
      console.error("Failed to generate API key:", error);
      throw error;
    }
  };

  const rotateApiKey = async (keyId: string): Promise<GenerateKeyResponse> => {
    try {
      const response = await apiKeysService.rotateApiKey(keyId);
      const updatedKeys = await apiKeysService.getApiKeys();
      setApiKeys(updatedKeys);
      return response;
    } catch (error) {
      console.error("Failed to rotate API key:", error);
      throw error;
    }
  };

  const deleteApiKey = async (keyId: string): Promise<void> => {
    try {
      await apiKeysService.deleteApiKey(keyId);
      const updatedKeys = apiKeys.filter((key) => key.id !== keyId);
      setApiKeys(updatedKeys);
    } catch (error) {
      console.error("Failed to delete API key:", error);
      throw error;
    }
  };

  const refreshApiKeys = async (): Promise<void> => {
    try {
      const data = await apiKeysService.getApiKeys();
      setApiKeys(data);
    } catch (error) {
      console.error("Failed to refresh API keys:", error);
      throw error;
    }
  };

  return {
    apiKeys,
    loading,
    error,
    generateApiKey,
    rotateApiKey,
    deleteApiKey,
    refreshApiKeys,
  };
};
