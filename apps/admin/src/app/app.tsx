import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { ROUTES } from "./routes";
import { LoginPage } from "../pages/login";
import { DashboardPage } from "../pages/dashboard";
import { SkillsPage } from "../pages/skills";
import { Navigation } from "./navigation";
import { ProtectedRoute } from "./protectedRoute";
import { localStorageService } from "../services/localStorageService";
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from "../features/auth/constants";

export function App() {
  const accessToken = localStorageService.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  const refreshToken = localStorageService.getItem(LOCAL_STORAGE_REFRESH_TOKEN);

  const navigate = useNavigate();

  useEffect(() => {
    if (!refreshToken) {
      navigate(ROUTES.LOGIN);
    }
  }, [refreshToken]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-gray-500 h-screen">
      <Navigation />
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={<LoginPage {...{ accessToken, refreshToken }} />}
        />
        <Route element={<ProtectedRoute token={accessToken} />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.SKILLS} element={<SkillsPage />} />
        </Route>
        <Route path={"*"} element={<Navigate to={ROUTES.DASHBOARD} />} />
      </Routes>
    </div>
  );
}

export default App;
