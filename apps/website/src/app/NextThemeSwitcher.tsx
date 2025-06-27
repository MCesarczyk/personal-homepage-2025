"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@/ui";

export type Theme = "light" | "dark";

export default function NextThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onThemeChange = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="relative mb-[-32px] animate-slideDown">
      <ThemeSwitcher {...{ isDarkTheme: theme === "dark", toggleDarkTheme: onThemeChange }} />
    </div>
  );
}
