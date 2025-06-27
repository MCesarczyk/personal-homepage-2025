"use client";

import { useRef } from "react";
import { Button, Input } from "@/ui";

interface SkillCreateFormProps {
  handleCreateNewSkill: (content: string) => void;
}

export const SkillCreateForm = ({ handleCreateNewSkill }: SkillCreateFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const content = formData.get("content") as string;

    handleCreateNewSkill(content);
    formRef.current?.reset();
    inputRef.current?.focus();
  };

  return (
    <form ref={formRef} className="my-8 flex gap-8" onSubmit={handleFormSubmit}>
      <Button variant="PRIMARY" type="submit">
        Add new
      </Button>
      <Input ref={inputRef} name="content" placeholder="Enter new content" />
    </form>
  );
};
