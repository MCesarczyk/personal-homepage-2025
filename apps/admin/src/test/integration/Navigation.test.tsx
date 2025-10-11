import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { render, screen } from "@testing-library/react";

// Mock the auth context
vi.mock("../../features/auth/context/AuthContext", () => ({
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

// Mock all the page components to avoid complex dependencies
vi.mock("../../features/dashboard/DashboardPage", () => ({
  DashboardPage: () => (
    <div data-testid="dashboard-page">Dashboard Page Content</div>
  ),
}));

vi.mock("../../features/technologies/TechnologiesPage", () => ({
  TechnologiesPage: () => (
    <div data-testid="technologies-page">Technologies Page Content</div>
  ),
}));

vi.mock("../../features/skills/SkillsPage", () => ({
  SkillsPage: () => <div data-testid="skills-page">Skills Page Content</div>,
}));

vi.mock("../../features/projects/ProjectsPage", () => ({
  ProjectsPage: () => (
    <div data-testid="projects-page">Projects Page Content</div>
  ),
}));

describe("Navigation Integration", () => {
  const user = userEvent.setup();

  it("navigates between pages correctly", async () => {
    render(<App />);

    // Should start on dashboard
    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();

    // Navigate to Technologies
    const techLinks = screen.getAllByRole("link", { name: /technologies/i });
    await user.click(techLinks[0]);
    expect(screen.getByTestId("technologies-page")).toBeInTheDocument();

    // Navigate to Skills
    const skillsLinks = screen.getAllByRole("link", { name: /skills/i });
    await user.click(skillsLinks[0]);
    expect(screen.getByTestId("skills-page")).toBeInTheDocument();

    // Navigate to Projects
    const projectsLinks = screen.getAllByRole("link", { name: /projects/i });
    await user.click(projectsLinks[0]);
    expect(screen.getByTestId("projects-page")).toBeInTheDocument();

    // Navigate back to Dashboard
    const dashboardLinks = screen.getAllByRole("link", { name: /dashboard/i });
    await user.click(dashboardLinks[0]);
    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();
  });

  it("highlights active navigation item", async () => {
    render(<App />);

    // Check dashboard is active initially
    const dashboardLinks = screen.getAllByRole("link", { name: /dashboard/i });
    expect(dashboardLinks[0]).toHaveClass("bg-blue-50", "text-blue-700");

    // Navigate to technologies and check it becomes active
    const techLinks = screen.getAllByRole("link", { name: /technologies/i });
    await user.click(techLinks[0]);

    expect(techLinks[0]).toHaveClass("bg-blue-50", "text-blue-700");
    expect(dashboardLinks[0]).not.toHaveClass("bg-blue-50", "text-blue-700");
  });

  it("shows mobile navigation on smaller screens", () => {
    render(<App />);

    // Mobile navigation should be present (hidden by default but in DOM)
    const mobileNav = screen
      .getAllByRole("navigation")
      .find((nav) => nav.classList.contains("md:hidden"));
    expect(mobileNav).toBeInTheDocument();
  });
});
