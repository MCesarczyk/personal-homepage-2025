import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => (
  <div className="flex flex-col justify-center items-center w-full max-w-lg h-80 p-12 my-0 mx-auto">{children}</div>
);
