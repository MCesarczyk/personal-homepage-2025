import { authService } from "../features/auth/authService";
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from "../features/auth/constants";
import { localStorageService } from "./localStorageService";

let isRefreshing = false;
let requestQueue: ((newToken: string) => Promise<void>)[] = [];

export const authorizedFetchService = async (
  url: string,
  options: RequestInit & { headers: { Authorization: string } },
): Promise<Response> => {
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${localStorageService.getItem(LOCAL_STORAGE_ACCESS_TOKEN)}`,
  };

  const response = await fetch(url, options);

  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const data = await authService.refresh();

        if (data.statusCode === 401) {
          console.log("Failed to refresh token");
          localStorageService.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
          localStorageService.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
        }

        localStorageService.setItem(
          LOCAL_STORAGE_ACCESS_TOKEN,
          data.accessToken,
        );
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
