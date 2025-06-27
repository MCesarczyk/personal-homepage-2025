import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "../ui/organisms/loginForm";
import { useHandleLogin } from "../features/auth/useHandleLogin";
import { ROUTES } from "../app/routes";

interface Props {
  accessToken?: string;
  refreshToken?: string;
}

export const LoginPage = ({ accessToken, refreshToken }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [accessToken, refreshToken]); // eslint-disable-line react-hooks/exhaustive-deps

  const { handleLogin } = useHandleLogin();

  return (
    <div className="grid place-content-center h-full">
      <LoginForm {...{ handleLogin }} />
    </div>
  );
};
