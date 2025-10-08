import { LucideIcon } from "lucide-react";

import { Card } from "../../shared/ui/Card";
import { cn } from "../../shared/utils/cn";
import { LoadingDots } from "../../shared/ui/LoadingDots";

interface StatCardProps {
  loading?: boolean;
  title: string;
  value: number;
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "orange";
  subtitle?: string;
}

export const StatCard = ({
  loading,
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: StatCardProps) => {
  const colorClasses = {
    blue: "bg-blue-600 text-blue-50",
    green: "bg-green-600 text-green-50",
    purple: "bg-purple-600 text-purple-50",
    orange: "bg-orange-600 text-orange-50",
  };

  return (
    <Card>
      <div className="flex items-center">
        <div className={cn("p-3 rounded-lg", colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-200">{title}</p>
          {loading ? (
            <div className="h-8 flex items-center">
              <LoadingDots />
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-300">{value}</p>
          )}
          {subtitle && <p className="text-xs text-blue-500">{subtitle}</p>}
        </div>
      </div>
    </Card>
  );
};
