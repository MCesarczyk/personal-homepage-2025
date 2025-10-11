import { authService } from "../features/auth/api/authService";
import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_REFRESH_TOKEN } from "../shared/constants/localStorage";

let isRefreshing = false;
let requestQueue: ((newToken: string) => Promise<void>)[] = [];

export const authorizedFetchService = async (url: string, optionsUpdate?: RequestInit): Promise<Response> => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

  const options = {
    ...optionsUpdate,
    headers: {
      ...(optionsUpdate?.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  if (response.status === 401) {
    console.log("Access token expired, attempting to refresh...");
    if (!isRefreshing) {
      isRefreshing = true;
      console.log("Refreshing token...");
      try {
        const data = await authService.refreshToken();

        if ("statusCode" in data && data.statusCode === 401) {
          console.log("Failed to refresh token");
          localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
          localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
        }

        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.accessToken);
        isRefreshing = false;

        requestQueue.forEach((cb) => cb(data.accessToken));
        requestQueue = [];

        options.headers.Authorization = `Bearer ${data.accessToken}`;
        return await fetch(url, options);
      } catch (e) {
        isRefreshing = false;
        requestQueue = [];
        throw e;
      }
    } else {
      return new Promise((resolve, reject) => {
        requestQueue.push(async (newToken) => {
          options.headers.Authorization = `Bearer ${newToken}`;
          try {
            const retryResponse = await fetch(url, options);
            resolve(retryResponse);
          } catch (err) {
            reject(err);
          }
        });
      });
    }
  }

  return response;
};
