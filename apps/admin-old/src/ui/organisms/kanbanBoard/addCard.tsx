import { type FormEvent, useRef } from "react";
import type { Task } from "./types";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";

interface AddCardProps {
  addCard: (task: Task) => void;
}

export const AddCard = ({ addCard }: AddCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current?.focus();
    }
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get("content");
    if (!content || content.toString().trim() === "") {
      resetInput();
      return;
    }

    if (typeof content === "string") {
      addCard({
        id: Math.random().toString().slice(2),
        content,
        state: "PLANNED",
        userId: "user123",
      });
      resetInput();
    }
  };

  return (
    <form className="flex gap-2" onSubmit={onFormSubmit}>
      <Input ref={inputRef} type="text" name="content" />
      <Button variant="PRIMARY">Add</Button>
    </form>
  );
};
