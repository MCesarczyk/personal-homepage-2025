export interface ApiKey {
  id: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  lastUsedAt: Date | null;
  expiresAt: Date | null;
}

export interface GenerateKeyRequest {
  description: string;
  expiresAt: Date | null;
}

export interface GenerateKeyResponse {
  apiKey: string;
  message: string;
}

export interface DeleteKeyResponse {
  message: string;
}

export interface RotateKeyResponse {
  apiKey: string;
  message: string;
}
