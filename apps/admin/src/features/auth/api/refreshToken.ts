import { API_PREFIX, API_URL } from "../../../shared/constants/apiUrl";
import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_REFRESH_TOKEN } from "../../../shared/constants/localStorage";
import { validateData } from "../../../shared/utils/validation";
import type { RefreshTokenResponse } from "../types";
import { refreshTokenResponseSchema } from "../validation/authSchemas";
import { AUTH_URLS } from "./authUrls";

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  const refreshTokenValue = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);

  if (!refreshTokenValue) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${API_URL}${API_PREFIX}${AUTH_URLS.refreshToken}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      refreshToken: refreshTokenValue,
    }),
  });

  const responseData = await response.json();
  const validatedResponse = validateData(refreshTokenResponseSchema, responseData);
  if (!validatedResponse.success) {
    throw new Error("Invalid refresh token response format from server");
  }

  return validatedResponse.data;
};
