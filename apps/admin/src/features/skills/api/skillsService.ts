import { localStorageService } from "../../../services/localStorageService";
import { API_PREFIX, API_URL } from "../../../app/apiUrl";
import { SKILLS_URLS } from "./skillsUrls";
import { LOCAL_STORAGE_ACCESS_TOKEN } from "../../auth/constants";
import { authorizedFetchService } from "../../../services/authorizedFetchService";

const token = localStorageService.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

export const skillsService = {
  getSkills: async () => {
    const response = await authorizedFetchService(
      `${API_URL}${API_PREFIX}${SKILLS_URLS.getSkills}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch skills");
    }
    return response.json();
  },
};
