import { Key } from "lucide-react";

import { ApiKeyItem } from "./ApiKeyItem";
import type { ApiKey } from "../types";

interface ApiKeyListProps {
  apiKeys: ApiKey[];
  onRotate: (keyId: string) => void;
  onRevoke: (keyId: string) => void;
  isLoading: boolean;
}

export function ApiKeyList({ apiKeys, onRotate, onRevoke, isLoading }: ApiKeyListProps) {
  if (apiKeys.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Key className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No API Keys</h3>
          <p className="text-sm text-gray-600 max-w-sm">
            You haven't generated any API keys yet. Create your first key to get started with the API.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Your API Keys</h2>
      <div className="space-y-3">
        {apiKeys.map((apiKey) => (
          <ApiKeyItem key={apiKey.id} apiKey={apiKey} onRotate={onRotate} onRevoke={onRevoke} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
}
