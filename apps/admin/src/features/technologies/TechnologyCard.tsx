import { Trash2 } from "lucide-react";

import { Card } from "../../shared/ui/Card";
import { Button } from "../../shared/ui/Button";
import { StarRating } from "../../shared/ui/StarRating";
import { type UserTechnology } from "./validation/technologySchemas";

interface TechnologyCardProps {
  technology: UserTechnology;
  onUpdate: (id: string, updates: Partial<UserTechnology>) => void;
  onDelete: (id: string) => void;
}

export const TechnologyCard = ({ technology, onUpdate, onDelete }: TechnologyCardProps) => {
  const handleRatingChange = (rating: number) => {
    onUpdate(technology.technologyId, { rating });
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-100 flex-1">{technology.content}</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onDelete(technology.technologyId)}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <StarRating
            rating={technology.rating}
            onRatingChange={handleRatingChange}
            readonly={false}
            name={technology.content}
          />
          <span className="text-sm text-gray-500">{technology.rating}/5</span>
        </div>
      </div>
    </Card>
  );
};
