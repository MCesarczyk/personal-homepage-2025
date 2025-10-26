import { RotateCw, Trash2 } from "lucide-react";

import type { ApiKey } from "../types";

interface ApiKeyItemProps {
  apiKey: ApiKey;
  onRotate: (keyId: string) => void;
  onRevoke: (keyId: string) => void;
  isLoading: boolean;
}

export function ApiKeyItem({ apiKey, onRotate, onRevoke, isLoading }: ApiKeyItemProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return "Never";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isExpired = apiKey.expiresAt ? new Date(apiKey.expiresAt) < new Date() : false;
  const truncatedHash = `${apiKey.keyHash.substring(0, 8)}...`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-medium text-gray-900 truncate">{apiKey.description || "Unnamed Key"}</h3>
            <span
              className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                apiKey.isActive && !isExpired ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {apiKey.isActive && !isExpired ? "Active" : isExpired ? "Expired" : "Inactive"}
            </span>
          </div>

          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Key:</span>
              <code className="px-2 py-0.5 bg-gray-100 rounded font-mono text-xs">{truncatedHash}</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Created:</span>
              <span>{formatDate(apiKey.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Last Used:</span>
              <span>{formatDate(apiKey.lastUsedAt)}</span>
            </div>
            {apiKey.expiresAt && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Expires:</span>
                <span className={isExpired ? "text-red-600 font-medium" : ""}>{formatDate(apiKey.expiresAt)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onRotate(apiKey.id)}
            disabled={isLoading || !apiKey.isActive}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            aria-label="Rotate API key"
            title="Rotate key"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            onClick={() => onRevoke(apiKey.id)}
            disabled={isLoading || !apiKey.isActive}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            aria-label="Revoke API key"
            title="Revoke key"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
