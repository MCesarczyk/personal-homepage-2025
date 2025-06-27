import { type ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export const PageTitle = ({ children }: TitleProps) => (
  <h1 className="block text-2xl md:text-3xl lg:text-4xl font-black text-left mt-3 mb-9">{children}</h1>
);
