import { useNavigate } from "react-router-dom";

import { authService } from "./authService";
import { localStorageService } from "../../services/localStorageService";
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from "./constants";
import { ROUTES } from "../../app/routes";

export const useHandleLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    const response = await authService.login(username, password);
    localStorageService.setItem(
      LOCAL_STORAGE_ACCESS_TOKEN,
      response.accessToken,
    );
    localStorageService.setItem(
      LOCAL_STORAGE_REFRESH_TOKEN,
      response.refreshToken,
    );
    navigate(ROUTES.DASHBOARD);
  };

  return {
    handleLogin,
  };
};
