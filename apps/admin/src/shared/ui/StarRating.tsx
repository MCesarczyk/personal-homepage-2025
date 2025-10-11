import { Star } from "lucide-react";
import { cn } from "../utils/cn";

interface StarRatingProps {
  name: string;
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export const StarRating = ({
  name,
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          data-testid={`${name.toLowerCase()}-star-${star}`}
          disabled={readonly}
          onClick={() => !readonly && onRatingChange?.(star)}
          className={cn(
            "transition-colors",
            !readonly && "hover:scale-110 transform",
            readonly && "cursor-default",
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300",
              !readonly && "hover:text-yellow-400",
            )}
          />
        </button>
      ))}
    </div>
  );
};
