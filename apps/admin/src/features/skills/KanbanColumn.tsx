import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";

import { Skill, SkillState } from "./types";
import { SkillCard } from "./SkillCard";
import { Button } from "../../shared/ui/Button";
import { cn } from "../../shared/utils/cn";

interface KanbanColumnProps {
  title: string;
  state: SkillState;
  skills: Skill[];
  onUpdate: (id: string, updates: Partial<Skill>) => void;
  onDelete: (id: string) => void;
  onAdd: (state: SkillState) => void;
  color: "blue" | "yellow" | "green";
}

export const KanbanColumn = ({
  title,
  state,
  skills,
  onUpdate,
  onDelete,
  onAdd,
  color,
}: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: state,
  });

  const colorClasses = {
    blue: "border-blue-900 bg-blue-700",
    yellow: "border-yellow-900 bg-yellow-700",
    green: "border-green-900 bg-green-700",
  };

  const headerColorClasses = {
    blue: "bg-blue-800 text-blue-200",
    yellow: "bg-yellow-800 text-yellow-200",
    green: "bg-green-800 text-green-200",
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-xl border-2 md:h-[600px] flex flex-col min-h-fit h-auto",
        colorClasses[color],
      )}
    >
      <div
        className={cn(
          "px-4 py-3 rounded-t-lg flex items-center justify-between",
          headerColorClasses[color],
        )}
      >
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm bg-gray-400 bg-opacity-50 px-2 py-1 rounded-full">
          {skills.length}
        </span>
      </div>

      <div className={cn("flex-1 p-4 transition-colors bg-gray-800")}>
        <div className="space-y-3 min-h-[200px]">
          {skills.map((skill, index) => (
            <div key={skill.id}>
              <SkillCard
                index={index}
                skill={skill}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAdd(state)}
          className="w-full mt-3 border-2 border-dashed border-gray-300 hover:border-gray-400"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>
    </div>
  );
};
