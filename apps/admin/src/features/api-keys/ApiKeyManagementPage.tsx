import { useState } from "react";
import { Loader2 } from "lucide-react";

import { GenerateKeyForm } from "./components/GenerateKeyForm";
import { ApiKeyList } from "./components/ApiKeyList";
import { KeyDisplayModal } from "./components/KeyDisplayModal";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { Toast, type ToastType } from "./components/Toast";
import { useApiKeys } from "./useApiKeys";
import type { GenerateKeyRequest } from "./types";

interface ToastMessage {
  message: string;
  type: ToastType;
}

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  variant: "danger" | "warning";
  onConfirm: () => void;
}

export const ApiKeyManagementPage = () => {
  const { apiKeys, loading, error, generateApiKey, rotateApiKey, deleteApiKey } = useApiKeys();
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    variant: "danger",
    onConfirm: () => {},
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  const handleGenerate = async (request: GenerateKeyRequest) => {
    try {
      setIsProcessing(true);
      const response = await generateApiKey(request);
      setGeneratedKey(response.apiKey);
      setShowKeyModal(true);
      showToast(response.message || "API key generated successfully", "success");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to generate API key", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRotate = (keyId: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Rotate API Key",
      message:
        "Are you sure you want to rotate this API key? The old key will be immediately revoked and a new one will be generated.",
      confirmText: "Rotate Key",
      variant: "warning",
      onConfirm: async () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        try {
          setIsProcessing(true);
          const response = await rotateApiKey(keyId);
          setGeneratedKey(response.apiKey);
          setShowKeyModal(true);
          showToast(response.message || "API key rotated successfully", "success");
        } catch (error) {
          showToast(error instanceof Error ? error.message : "Failed to rotate API key", "error");
        } finally {
          setIsProcessing(false);
        }
      },
    });
  };

  const handleRevoke = (keyId: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Revoke API Key",
      message:
        "Are you sure you want to revoke this API key? This action cannot be undone and will immediately invalidate the key.",
      confirmText: "Revoke Key",
      variant: "danger",
      onConfirm: async () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        try {
          setIsProcessing(true);
          await deleteApiKey(keyId);
          showToast("API key revoked successfully", "success");
        } catch (error) {
          showToast(error instanceof Error ? error.message : "Failed to revoke API key", "error");
        } finally {
          setIsProcessing(false);
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-sm text-gray-600">Loading API keys...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load API keys</p>
          <p className="text-sm text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Key Management</h1>
          <p className="text-gray-600">Generate and manage your API keys for secure access to our services.</p>
        </div>

        <div className="space-y-6">
          <GenerateKeyForm onGenerate={handleGenerate} isLoading={isProcessing} />
          <ApiKeyList apiKeys={apiKeys} onRotate={handleRotate} onRevoke={handleRevoke} isLoading={isProcessing} />
        </div>
      </div>

      {generatedKey && (
        <KeyDisplayModal
          apiKey={generatedKey}
          isOpen={showKeyModal}
          onClose={() => {
            setShowKeyModal(false);
            setGeneratedKey(null);
          }}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
