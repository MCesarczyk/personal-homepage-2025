import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";

interface ProtectedRouteProps {
  token: string | null;
}

export const ProtectedRoute = ({ token }: ProtectedRouteProps) => {
  return token ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};
