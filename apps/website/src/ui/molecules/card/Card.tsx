"use client";

import { useState, type ChangeEvent, useEffect } from "react";
import { type SkillDto, type SkillState } from "@/app/admin/skills/types";
import { Select, Button, Input } from "../../atoms";

interface CardProps {
  id: string;
  content: string;
  state: SkillState;
  changeState: (id: string, payload: Partial<SkillDto>) => void;
  editSkill: (id: string, payload: Partial<SkillDto>) => void;
  deleteSkill: (id: string) => void;
}

export const Card = ({ id, content, state, changeState, editSkill, deleteSkill }: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [deletionConfirmation, setDeletionConfirmation] = useState(false);

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) =>
    changeState(id, { state: e.target.value as SkillState });

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => setNewContent(e.target.value);

  const enableEditMode = () => setIsEditing(!isEditing);

  const handleEditFinish = () => {
    editSkill(id, { content: newContent });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (deletionConfirmation) {
      setDeletionConfirmation(false);
      return deleteSkill(id);
    }

    setDeletionConfirmation(true);
  };

  useEffect(() => {
    if (deletionConfirmation) {
      const timeout = setTimeout(() => setDeletionConfirmation(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [deletionConfirmation]);

  return (
    <div className="text-left text-sm px-4 py-2 md:px-8 md:py-4 md:text-base rounded bg-white dark:bg-gray-800 border-4 border-gray-500 border-opacity-10 dark:border-opacity-10 shadow-md shadow-gray-900 transition-all ease-in duration-300 hover:shadow-blue-500 flex gap-4 md:gap-8 items-center justify-between">
      {isEditing ? (
        <Input value={newContent} onChange={handleContentChange} onBlur={handleEditFinish} />
      ) : (
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-blue-800 dark:text-blue-600">
          {content}
        </h3>
      )}
      <div className="flex gap-4 md:gap-8">
        <Select
          options={[
            { value: "PLANNED", label: "Planned" },
            { value: "RUNNING", label: "Running" },
            { value: "COMPLETED", label: "Completed" },
          ]}
          value={state}
          onChange={handleStateChange}
        />
        <Button onClick={enableEditMode} variant="SECONDARY">
          Edit
        </Button>
        <Button onClick={handleDelete} variant="SECONDARY">
          <span className="text-red-500">{deletionConfirmation ? "Confirm" : "Delete"}</span>
        </Button>
      </div>
    </div>
  );
};
