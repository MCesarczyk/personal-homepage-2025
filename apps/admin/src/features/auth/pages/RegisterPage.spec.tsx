import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import { RegisterPage } from "./RegisterPage";
import { AuthProvider } from "../context/AuthContext";

const MockedRegisterPage = () => (
  <BrowserRouter>
    <AuthProvider>
      <RegisterPage />
    </AuthProvider>
  </BrowserRouter>
);

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("RegisterPage", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders register page with all elements", async () => {
    render(<MockedRegisterPage />);

    expect(screen.getByText("Create your account")).toBeInTheDocument();
    expect(
      screen.getByText("Join us today! Fill in your details to get started."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /create account/i }),
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<MockedRegisterPage />);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /create account/i }),
      ).toBeInTheDocument();
    });
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Name must be at least 2 characters"),
      ).toBeInTheDocument();
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 6 characters"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Password confirmation is required"),
      ).toBeInTheDocument();
      expect(screen.getByText("Occupation is required")).toBeInTheDocument();
      expect(screen.getByText("Introduction is required")).toBeInTheDocument();
    });
  });

  it("shows validation error for short name", async () => {
    render(<MockedRegisterPage />);

    const nameInput = screen.getByLabelText(/full name/i);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /create account/i }),
      ).toBeInTheDocument();
    });
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(nameInput, "A");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Name must be at least 2 characters"),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email format", async () => {
    render(<MockedRegisterPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /create account/i }),
      ).toBeInTheDocument();
    });
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("shows validation error for short password", async () => {
    render(<MockedRegisterPage />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /create account/i }),
      ).toBeInTheDocument();
    });
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(passwordInput, "123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 6 characters"),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for mismatched passwords", async () => {
    render(<MockedRegisterPage />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /create account/i }),
      ).toBeInTheDocument();
    });
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "different123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
    });
  });

  it("toggles password visibility for both password fields", async () => {
    render(<MockedRegisterPage />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const toggleButtons = screen.getAllByRole("button", { name: "" }); // Eye icon buttons

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(confirmPasswordInput).toHaveAttribute("type", "password");

    // Toggle first password field
    await user.click(toggleButtons[0]);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Toggle second password field
    await user.click(toggleButtons[1]);
    expect(confirmPasswordInput).toHaveAttribute("type", "text");
  });

  it("clears field errors when user starts typing", async () => {
    render(<MockedRegisterPage />);

    const nameInput = screen.getByLabelText(/full name/i);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /create account/i }),
      ).toBeInTheDocument();
    });
    const submitButton = screen.getByRole("button", {
      name: /create account/i,
    });

    // Trigger validation error
    await user.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText("Name must be at least 2 characters"),
      ).toBeInTheDocument();
    });

    // Start typing to clear error
    await user.type(nameInput, "John");
    await waitFor(() => {
      expect(
        screen.queryByText("Name must be at least 2 characters"),
      ).not.toBeInTheDocument();
    });
  });

  it("has link to login page", () => {
    render(<MockedRegisterPage />);

    const loginLink = screen.getByRole("link", { name: /sign in here/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
