import clsx from "clsx";
import { type ComponentProps, type ReactNode } from "react";

type ButtonVariant = "PRIMARY" | "SECONDARY";

const buttonStyles = {
  PRIMARY:
    "py-2 md:py-3 px-3 md:px-4 rounded text-white bg-blue-800 dark:bg-blue-600 hover:bg-blue-600 active:bg-blue-600 hover:scale-105 active:scale-100 transition-all duration-300",
  SECONDARY: "hover:scale-105 active:scale-100 transition-all duration-300",
};

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
}

export const Button = ({ variant, children, ...props }: ComponentProps<"button"> & ButtonProps) => (
  <button
    {...props}
    className={clsx(
      "inline-flex items-center text-sm sm:text-base md:text-lg lg:text-xl cursor-pointer",
      buttonStyles[variant ?? "PRIMARY"],
      variant === "PRIMARY"
        ? "text-white"
        : "text-blue-800 dark:text-blue-500 font-normal border-transparent border-b-2",
    )}
  >
    {children}
  </button>
);
