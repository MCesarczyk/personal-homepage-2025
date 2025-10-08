import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { cn } from "../utils/cn";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning";
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex items-start space-x-4">
        <div
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
            variant === "danger" ? "bg-red-100" : "bg-yellow-100",
          )}
        >
          <AlertTriangle
            className={cn(
              "w-6 h-6",
              variant === "danger" ? "text-red-600" : "text-yellow-600",
            )}
          />
        </div>
        <div className="flex-1">
          <p className="text-gray-900 mb-6">{message}</p>
          <div className="flex space-x-3 justify-end">
            <Button variant="secondary" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
