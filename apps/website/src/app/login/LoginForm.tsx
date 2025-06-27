"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { Button, Input, PageTitle } from "@/ui";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(`Logging in as ${email} with password ${password} to ${process.env.NEXT_PUBLIC_API_URL}`);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PREFIX}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log(data.accessToken);

    Cookies.set("accessToken", data.accessToken);

    router.push("/admin");
  };

  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-96 my-12 mx-auto">
        <PageTitle>Log in</PageTitle>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target?.value)}
          type="email"
          name="email"
          placeholder="Email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target?.value)}
          type="password"
          name="password"
          placeholder="Password"
        />
        <Button variant="PRIMARY" type="submit">
          Log in
        </Button>
      </form>
    </>
  );
};
