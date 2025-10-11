import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRouterDom from "react-router-dom";

import { LoginPage } from "./LoginPage";
import { AuthProvider } from "../context/AuthContext";

const MockedLoginPage = () => (
  <reactRouterDom.BrowserRouter>
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  </reactRouterDom.BrowserRouter>
);

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginPage", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(reactRouterDom, "useNavigate").mockReturnValue(mockNavigate);
  });

  it("renders login page with all elements", async () => {
    render(<MockedLoginPage />);

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Welcome back! Please enter your credentials to continue.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign in/i }),
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<MockedLoginPage />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign in/i }),
      ).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 6 characters"),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email format", async () => {
    render(<MockedLoginPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign in/i }),
      ).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("shows validation error for short password", async () => {
    render(<MockedLoginPage />);

    const passwordInput = screen.getByLabelText(/password/i);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign in/i }),
      ).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    await user.type(passwordInput, "123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 6 characters"),
      ).toBeInTheDocument();
    });
  });

  it("toggles password visibility", async () => {
    render(<MockedLoginPage />);

    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole("button", { name: "" }); // Eye icon button

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("attempts login with valid credentials", async () => {
    render(<MockedLoginPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "admin@example.com");
    await user.type(passwordInput, "admin123");
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign in/i }),
      ).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    await user.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("clears field errors when user starts typing", async () => {
    render(<MockedLoginPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign in/i }),
      ).toBeInTheDocument();
    });
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Trigger validation error
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });

    // Start typing to clear error
    await user.type(emailInput, "test");
    await waitFor(() => {
      expect(
        screen.queryByText("Invalid email address"),
      ).not.toBeInTheDocument();
    });
  });

  it("has link to register page", () => {
    render(<MockedLoginPage />);

    const registerLink = screen.getByRole("link", { name: /sign up here/i });
    expect(registerLink).toHaveAttribute("href", "/register");
  });
});
