"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { Button } from "@/ui";
import { useRefreshTokenWatcher } from "@/app/admin/useRefreshTokenWatcher";
import { CurrentUsernameLogger } from "@/app/admin/CurrentUsernameLogger";

export const Topbar = () => {
  const accessToken = Cookies.get("accessToken");
  const router = useRouter();

  const logout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PREFIX}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      },
    );

    if (response.ok) {
      Cookies.remove("accessToken");
      router.push("/login");
    }
  };

  useRefreshTokenWatcher();

  return (
    <div className="w-2/3 xs:w-1/2 md:w-1/3 mb-16 mr-auto z-20">
      <div className="flex flex-row items-center gap-6">
        <div className="max-w-40 mt-[-32px]">
          <Button variant="PRIMARY" onClick={logout}>
            Log out
          </Button>
        </div>
        <div className="mt-[-32px]">
          <CurrentUsernameLogger accessToken={accessToken} />
        </div>
      </div>
    </div>
  );
};
