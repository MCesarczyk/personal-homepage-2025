import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-green-50" : "bg-red-50";
  const borderColor = type === "success" ? "border-green-200" : "border-red-200";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? CheckCircle : XCircle;
  const iconColor = type === "success" ? "text-green-600" : "text-red-600";

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-start gap-3 p-4 ${bgColor} border ${borderColor} rounded-lg shadow-lg max-w-md animate-slide-in`}
      role="alert"
    >
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <p className={`text-sm font-medium ${textColor} flex-1`}>{message}</p>
      <button
        onClick={onClose}
        className={`${textColor} hover:opacity-70 transition-opacity`}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
