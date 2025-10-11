import { describe, it, expect, beforeEach, vi } from "vitest";

import { DashboardPage } from "./DashboardPage";
import { mockTechnologies } from "../technologies/api/mockData";
import { mockSkills } from "../skills/api/mockData";
import { mockProjects } from "../projects/api/mockData";
import { render, screen, waitFor } from "../../test/utils/testUtils";

// Mock the hooks
vi.mock("../technologies/useTechnologies", () => ({
  useTechnologies: () => ({
    technologies: mockTechnologies,
    loading: false,
  }),
}));

vi.mock("../skills/useSkills", () => ({
  useSkills: () => ({
    skills: mockSkills,
    loading: false,
  }),
}));

vi.mock("../projects/useProjects", () => ({
  useProjects: () => ({
    projects: mockProjects,
    loading: false,
  }),
}));

describe("Dashboard Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dashboard title and description", async () => {
    render(<DashboardPage />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Overview of your portfolio content and recent activity",
      ),
    ).toBeInTheDocument();
  });

  it("displays correct statistics cards", async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      // Check stat cards are present
      expect(screen.getAllByText(/technologies/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/skills/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/projects/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/completed skills/i).length).toBeGreaterThan(
        0,
      );

      // Check stat values based on mock data
      expect(
        screen.getAllByText(mockTechnologies.length.toString()).length,
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByText(mockSkills.length.toString()).length,
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByText(mockProjects.length.toString()).length,
      ).toBeGreaterThan(0);

      // Check completed skills count
      const completedSkills = mockSkills.filter(
        (skill) => skill.state === "COMPLETED",
      ).length;
      expect(screen.getByText(completedSkills.toString())).toBeInTheDocument();
    });
  });

  it("displays recent sections with correct data", async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      // Check section titles
      expect(screen.getByText(/recent technologies/i)).toBeInTheDocument();
      expect(screen.getByText(/recent skills/i)).toBeInTheDocument();
      expect(screen.getByText(/recent projects/i)).toBeInTheDocument();

      // Check some recent items are displayed
      expect(screen.getByText(/react/i)).toBeInTheDocument();
      expect(
        screen.getByText(/learn advanced react patterns/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/e-commerce platform/i)).toBeInTheDocument();
    });
  });

  it("has working navigation links in recent sections", async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      const viewAllLinks = screen.getAllByText(/view all/i);
      expect(viewAllLinks).toHaveLength(3);

      // Check that links have correct href attributes
      expect(viewAllLinks[0].closest("a")).toHaveAttribute(
        "href",
        "/technologies",
      );
      expect(viewAllLinks[1].closest("a")).toHaveAttribute("href", "/skills");
      expect(viewAllLinks[2].closest("a")).toHaveAttribute("href", "/projects");
    });
  });
});
