export type {
  User,
  LoginCredentials,
  RegisterData,
  LoginResponse,
  RefreshTokenResponse,
} from "./validation/authSchemas";

export interface AuthError {
  message: string;
  field?: string;
}
