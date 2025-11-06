import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApiKeyManagementPage } from "./ApiKeyManagementPage";

vi.mock("./useApiKeys", () => ({
  useApiKeys: vi.fn(),
}));
import { useApiKeys } from "./useApiKeys";
import type { Mock } from "vitest";
import { mockApiKeys } from "./api/mockData";
const mockedUseApiKeys = useApiKeys as Mock;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ApiKeyManagementPage (Integration)", () => {
  it("renders loading state", () => {
    mockedUseApiKeys.mockReturnValue({
      apiKeys: [],
      loading: true,
      error: null,
    });
    render(<ApiKeyManagementPage />);
    expect(screen.getByText(/Loading API keys/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockedUseApiKeys.mockReturnValue({
      apiKeys: [],
      loading: false,
      error: { message: "Network error!" },
    });
    render(<ApiKeyManagementPage />);
    expect(screen.getByText(/Failed to load API keys/i)).toBeInTheDocument();
    expect(screen.getByText(/Network error!/i)).toBeInTheDocument();
  });

  it("renders keys and interacts with form/list", async () => {
    const generateApiKey = vi.fn().mockResolvedValue({
      apiKey: "new-key-123",
      message: "Success!",
    });
    const rotateApiKey = vi.fn().mockResolvedValue({
      apiKey: "rotated-key-456",
      message: "Key rotated!",
    });
    const deleteApiKey = vi.fn().mockResolvedValue({});
    mockedUseApiKeys.mockReturnValue({
      apiKeys: [...mockApiKeys],
      loading: false,
      error: null,
      generateApiKey,
      rotateApiKey,
      deleteApiKey,
    });
    render(<ApiKeyManagementPage />);

    // Assert page header, key list
    expect(screen.getByRole("heading", { name: /API Key Management/i })).toBeInTheDocument();
    expect(screen.getByText(/Production API Key/)).toBeInTheDocument();

    // Find and interact with GenerateKeyForm
    const descriptionInput = screen.getByLabelText(/description/i);
    if (descriptionInput) {
      fireEvent.change(descriptionInput, { target: { value: "New-key-123" } });
    }
    const genButton = screen.getByRole("button", { name: /generate/i });
    fireEvent.click(genButton);
    await waitFor(() => expect(generateApiKey).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(/api key generated/i)).toBeInTheDocument());
    const doneButton = screen.getByRole("button", { name: /Done/i });
    fireEvent.click(doneButton);
    await waitFor(() => expect(screen.queryByText(/api key generated/i)).not.toBeInTheDocument());

    // await waitFor(() => expect(screen.getByText(/new-key-123/i)).toBeInTheDocument());
    expect(screen.getByText(/Success!/i)).toBeInTheDocument();

    // Rotate API Key button (should match your list implementation)
    const rotateButton = screen.getByTestId("rotate-api-key-button-1");
    fireEvent.click(rotateButton);

    await waitFor(() => expect(screen.getByText(/Rotate API Key/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: /Rotate Key/i }));
    await waitFor(() => expect(rotateApiKey).toHaveBeenCalled());
    // await waitFor(() => expect(screen.getByText(/rotated-key-456/)).toBeInTheDocument());
    expect(screen.getByText(/Key rotated!/)).toBeInTheDocument();

    // Revoke API Key
    const revokeButton = screen.getByTestId("revoke-api-key-button-1");
    fireEvent.click(revokeButton);
    await waitFor(() => expect(screen.getByText(/Revoke API Key/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: /Revoke Key/i }));
    await waitFor(() => expect(deleteApiKey).toHaveBeenCalledWith("1"));
  });

  it("doesn't invoke any action on inactive API key", async () => {
    mockedUseApiKeys.mockReturnValue({
      apiKeys: [...mockApiKeys],
      loading: false,
      error: null,
      generateApiKey: vi.fn().mockRejectedValue(new Error("Failed to generate API key")),
      rotateApiKey: vi.fn().mockRejectedValue(new Error("Failed to rotate API key")),
      deleteApiKey: vi.fn().mockRejectedValue(new Error("Failed to revoke API key")),
    });
    render(<ApiKeyManagementPage />);

    // Try rotating key
    await waitFor(() => expect(screen.getByTestId("rotate-api-key-button-3")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("rotate-api-key-button-3"));
    expect(screen.queryByText(/Are you sure you want to rotate this API key?/i)).not.toBeInTheDocument();

    // Try revoking key
    await waitFor(() => expect(screen.getByTestId("revoke-api-key-button-3")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("revoke-api-key-button-3"));
    expect(screen.queryByText(/Are you sure you want to revoke this API key?/i)).not.toBeInTheDocument();
  });

  it("shows error toast on generate failure", async () => {
    mockedUseApiKeys.mockReturnValue({
      apiKeys: [...mockApiKeys],
      loading: false,
      error: null,
      generateApiKey: vi.fn().mockRejectedValue(new Error("Failed to generate API key")),
      rotateApiKey: vi.fn().mockRejectedValue(new Error("Failed to rotate API key")),
      deleteApiKey: vi.fn().mockRejectedValue(new Error("Failed to revoke API key")),
    });
    render(<ApiKeyManagementPage />);

    // Fill in the description using the aria-label
    const descriptionInput = screen.getByLabelText(/description/i);
    fireEvent.change(descriptionInput, { target: { value: "Test Key" } });

    // Try generating key, expect error toast
    fireEvent.click(screen.getByRole("button", { name: /generate/i }));
    await waitFor(() => expect(screen.getByText(/Failed to generate API key/)).toBeInTheDocument());
  });

  it("shows error toast on rotate failure", async () => {
    mockedUseApiKeys.mockReturnValue({
      apiKeys: [...mockApiKeys],
      loading: false,
      error: null,
      generateApiKey: vi.fn().mockRejectedValue(new Error("Failed to generate API key")),
      rotateApiKey: vi.fn().mockRejectedValue(new Error("Failed to rotate API key")),
      deleteApiKey: vi.fn().mockRejectedValue(new Error("Failed to revoke API key")),
    });
    render(<ApiKeyManagementPage />);

    // Try rotating key
    await waitFor(() => expect(screen.getByTestId("rotate-api-key-button-1")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("rotate-api-key-button-1"));
    await waitFor(() => expect(screen.getByText(/Are you sure you want to rotate this API key?/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: /Rotate Key/i }));
    await waitFor(() => expect(screen.getByText(/Failed to rotate API key/)).toBeInTheDocument());
  });

  it("shows error toast on revoke failure", async () => {
    mockedUseApiKeys.mockReturnValue({
      apiKeys: [...mockApiKeys],
      loading: false,
      error: null,
      generateApiKey: vi.fn().mockRejectedValue(new Error("Failed to generate API key")),
      rotateApiKey: vi.fn().mockRejectedValue(new Error("Failed to rotate API key")),
      deleteApiKey: vi.fn().mockRejectedValue(new Error("Failed to revoke API key")),
    });
    render(<ApiKeyManagementPage />);

    // Try revoking key
    await waitFor(() => expect(screen.getByTestId("revoke-api-key-button-1")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("revoke-api-key-button-1"));
    await waitFor(() => expect(screen.getByText(/Are you sure you want to revoke this API key?/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: /Revoke Key/i }));
    await waitFor(() => expect(screen.getByText(/Failed to revoke API key/)).toBeInTheDocument());
  });
});
