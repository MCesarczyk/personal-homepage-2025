import { useEffect, useState } from "react";

interface CurrentUsernameLoggerProps {
  accessToken: string | undefined;
}

export const CurrentUsernameLogger = ({ accessToken }: CurrentUsernameLoggerProps) => {
  const [username, setUsername] = useState("");

  const getUserData = async () => {
    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PREFIX}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await user.json();

    setUsername(data.email);
  };

  useEffect(() => {
    getUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <p className="h-full hidden xs:block">{username}</p>;
};
