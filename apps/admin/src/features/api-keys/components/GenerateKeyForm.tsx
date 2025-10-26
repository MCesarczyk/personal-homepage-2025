import { useState, type FormEvent } from "react";
import { Plus, Loader2 } from "lucide-react";

import type { GenerateKeyRequest } from "../types";

interface GenerateKeyFormProps {
  onGenerate: (request: GenerateKeyRequest) => Promise<void>;
  isLoading: boolean;
}

export function GenerateKeyForm({ onGenerate, isLoading }: GenerateKeyFormProps) {
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!description.trim()) return;

    const request: GenerateKeyRequest = {
      description: description.trim(),
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    };

    await onGenerate(request);
    setDescription("");
    setExpiresAt("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate New API Key</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Production API, Mobile App Key"
            required
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            aria-label="API key description"
          />
        </div>

        <div>
          <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-2">
            Expiration Date (Optional)
          </label>
          <input
            type="date"
            id="expiresAt"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            aria-label="API key expiration date"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !description.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          aria-label="Generate API key"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Generate API Key
            </>
          )}
        </button>
      </form>
    </div>
  );
}
