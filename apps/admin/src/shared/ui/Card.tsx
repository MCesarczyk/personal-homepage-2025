import { cn } from "../utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = ({ children, className, padding = "md" }: CardProps) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "bg-gray-700 rounded-xl shadow-sm border border-gray-900 transition-shadow hover:shadow-md",
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
};
