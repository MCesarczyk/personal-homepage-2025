import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { Card } from "../../shared/ui/Card";

interface RecentSectionProps {
  title: string;
  items: Array<{
    id: string;
    name: string;
    subtitle?: string;
  }>;
  linkTo: string;
  emptyMessage: string;
}

export const RecentSection = ({
  title,
  items,
  linkTo,
  emptyMessage,
}: RecentSectionProps) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-50">{title}</h3>
        <Link
          to={linkTo}
          className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          View all
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-100 text-sm">{emptyMessage}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-50">{item.name}</p>
                {item.subtitle && (
                  <p className="text-sm text-gray-400">{item.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
