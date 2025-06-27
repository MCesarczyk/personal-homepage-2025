import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => (
  <div className="max-w-7xl min-w-80 my-0 mx-auto p-4 sm:p-6 md:p-8 transition-all duration-500">{children}</div>
);
