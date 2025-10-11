import { type MouseEvent, useState } from "react";
import { Edit3, Trash2, Check, X } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { type Skill } from "./types";
import { Card } from "../../shared/ui/Card";
import { Button } from "../../shared/ui/Button";
import { cn } from "../../shared/utils/cn";
import { Handle } from "./Handle";

interface SkillCardProps {
  index: number;
  skill: Skill;
  onUpdate: (id: string, updates: Partial<Skill>) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

export const SkillCard = ({ index, skill, onUpdate, onDelete, isDragging = false }: SkillCardProps) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform } = useDraggable({
    id: skill.id,
    data: {
      id: skill.id,
      content: skill.content,
      index,
      parent,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(skill.content);

  const handleEdit = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    setIsEditing(true);
  };

  const handleSave = async () => {
    if (editContent.trim()) {
      await onUpdate(skill.id, { content: editContent.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditContent(skill.content);
    setIsEditing(false);
  };

  return (
    <div style={style} {...attributes} ref={setNodeRef}>
      <Card
        className={cn("mb-3 transition-all duration-200", isDragging && "rotate-3 scale-105 shadow-lg")}
        padding="sm"
      >
        <Handle {...{ ref: setActivatorNodeRef }} {...listeners} />
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
              autoFocus
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSave}>
                <Check className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-medium text-gray-50 flex-1">{skill.content}</p>
            <div className="flex space-x-1 ml-2">
              <Button variant="ghost" size="sm" onClick={handleEdit}>
                <Edit3 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(skill.id)}>
                <Trash2 className="w-3 h-3 text-red-500" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
