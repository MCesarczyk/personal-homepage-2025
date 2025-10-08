import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  occupation: z.string().min(1, "Occupation is required"),
  introduction: z.string().min(1, "Introduction is required"),
});

export const loginCredentialsSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerDataSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    occupation: z.string().min(1, "Occupation is required"),
    introduction: z.string().min(1, "Introduction is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const registerResponseSchema = z.intersection(
  userSchema,
  loginResponseSchema,
);

export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type RegisterData = z.infer<typeof registerDataSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
