import { useEffect, useState } from "react";

import { SkillState } from "./types";
import { Modal } from "../../shared/ui/Modal";
import { Button } from "../../shared/ui/Button";
import { createSkillSchema } from "./validation/skillSchemas";
import { formatValidationErrors } from "../../shared/utils/validation";

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (content: string, state: SkillState) => void;
  initialState?: SkillState;
}

export const AddSkillModal = ({
  isOpen,
  onClose,
  onAdd,
  initialState = SkillState.PLANNED,
}: AddSkillModalProps) => {
  const [content, setContent] = useState("");
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = createSkillSchema.safeParse({
      content: content.trim(),
      state,
    });
    if (!result.success) {
      const validationErrors = formatValidationErrors(result.error);
      setErrors(validationErrors);
      return;
    }

    try {
      onAdd(result.data.content, result.data.state as SkillState);
      setContent("");
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Failed to add skill:", error);
    }
  };

  const handleClose = () => {
    setContent("");
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Skill">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Skill Description
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Describe the skill you want to learn or improve..."
            required
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Initial State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value as SkillState)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={SkillState.PLANNED}>Planned</option>
            <option value={SkillState.RUNNING}>Running</option>
            <option value={SkillState.COMPLETED}>Completed</option>
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};
