import clsx from "clsx";
import { type ComponentProps, type ReactNode } from "react";

type LinkVariant = "PRIMARY" | "SECONDARY";

const linkStyles = {
  PRIMARY:
    "py-2 md:py-3 px-3 md:px-4 rounded text-white bg-blue-800 dark:bg-blue-600 hover:bg-blue-600 active:bg-blue-600 hover:scale-105 active:scale-100 transition-all duration-300",
  SECONDARY: "hover:scale-105 active:scale-100 transition-all duration-300",
};

interface LinkProps {
  children: ReactNode;
  variant?: LinkVariant;
  current?: boolean;
}

export const Link = ({ variant, children, href, current }: ComponentProps<"a"> & LinkProps) => (
  <a
    {...{ href }}
    className={clsx(
      "inline-flex items-center text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer",
      linkStyles[variant ?? "PRIMARY"],
      variant === "PRIMARY"
        ? current
          ? "text-red-800 hover:text-red-500 active:text-red-500 dark:text-red-500 dark:hover:text-red-300 dark:active:text-red-300 font-medium"
          : "text-white"
        : current
          ? "text-red-800 hover:text-red-500 active:text-red-500 dark:text-red-500 dark:hover:text-red-300 dark:active:text-red-300 font-medium border-red-500 border-b-2"
          : "text-blue-800 dark:text-blue-500 font-normal border-transparent border-b-2",
    )}
  >
    {children}
  </a>
);
