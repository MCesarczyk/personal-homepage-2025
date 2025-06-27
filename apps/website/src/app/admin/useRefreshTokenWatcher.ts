import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import * as jwt from "jsonwebtoken";

export const useRefreshTokenWatcher = () => {
  const accessToken = Cookies.get("accessToken");

  const [tokenExpires, setTokenExpires] = useState<number | undefined>();

  const refreshToken = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PREFIX}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    const data = await response.json();

    const newAccessToken = data.accessToken;

    Cookies.set("accessToken", newAccessToken);

    const decodedToken: string | jwt.JwtPayload | null = jwt.decode(newAccessToken as unknown as string);

    if (decodedToken && typeof decodedToken !== "string" && decodedToken.exp) {
      setTokenExpires(new Date(new Date(decodedToken.exp * 1000).getTime() - Date.now() - 60 * 1000).getTime());
    }

    console.log(newAccessToken);
  };

  useEffect(() => {
    const refreshTimeout = setTimeout(() => {
      refreshToken();
    }, tokenExpires);

    return () => clearTimeout(refreshTimeout);
  }, [accessToken, tokenExpires]); // eslint-disable-line react-hooks/exhaustive-deps
};
