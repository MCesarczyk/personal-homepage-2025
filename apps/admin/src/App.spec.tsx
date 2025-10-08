import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the auth context
vi.mock("./features/auth/context/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useAuth: () => ({
    isAuthenticated: true,
    isLoading: false,
    user: { id: "1", name: "Test User", email: "test@example.com" },
    logout: vi.fn(),
  }),
}));

// Mock all the page components
vi.mock("./features/dashboard/DashboardPage", () => ({
  DashboardPage: () => <div>Dashboard Page</div>,
}));

vi.mock("./features/technologies/TechnologiesPage", () => ({
  TechnologiesPage: () => <div>Technologies Page</div>,
}));

vi.mock("./features/skills/SkillsPage", () => ({
  SkillsPage: () => <div>Skills Page</div>,
}));

vi.mock("./features/projects/ProjectsPage", () => ({
  ProjectsPage: () => <div>Projects Page</div>,
}));

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText("Portfolio CMS")).toBeInTheDocument();
  });

  it("renders dashboard by default", () => {
    render(<App />);
    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });

  it("displays navigation header with all menu items", () => {
    render(<App />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Technologies")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("shows logo and brand name in header", () => {
    render(<App />);

    expect(screen.getByText("Portfolio CMS")).toBeInTheDocument();
    // Logo should be present (Code icon)
    const logo = screen.getByTestId("hero-logo");
    expect(logo).toBeInTheDocument();
  });
});
