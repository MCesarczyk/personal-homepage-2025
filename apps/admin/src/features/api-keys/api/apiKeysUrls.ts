export const API_KEYS_URLS = {
  LIST: "/api-key/list",
  GENERATE: "/api-key/generate",
  REVOKE: (keyId: string) => `/api-key/${keyId}`,
  ROTATE: (keyId: string) => `/api-key/${keyId}/rotate`,
};
