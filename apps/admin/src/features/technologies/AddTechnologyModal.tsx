import { useState } from "react";

import { Modal } from "../../shared/ui/Modal";
import { Button } from "../../shared/ui/Button";
import { StarRating } from "../../shared/ui/StarRating";
import { createTechnologySchema } from "./validation/technologySchemas";
import { formatValidationErrors } from "../../shared/utils/validation";

interface AddTechnologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (content: string, rating: number) => void;
}

export const AddTechnologyModal = ({
  isOpen,
  onClose,
  onAdd,
}: AddTechnologyModalProps) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = createTechnologySchema.safeParse({
      content: content.trim(),
      rating,
    });
    if (!result.success) {
      const validationErrors = formatValidationErrors(result.error);
      setErrors(validationErrors);
      return;
    }

    try {
      onAdd(result.data.content, result.data.rating);
      setContent("");
      setRating(0);
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Failed to add technology:", error);
    }
  };

  const handleClose = () => {
    setContent("");
    setRating(0);
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="New Technology">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Technology Name
          </label>
          <input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., React, Node.js, PostgreSQL"
            required
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proficiency Level
          </label>
          <div className="flex items-center space-x-3">
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              name={content}
            />
            <span className="text-sm text-gray-600">{rating}/5</span>
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
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
