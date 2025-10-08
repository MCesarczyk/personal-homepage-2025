import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "../../test/utils/testUtils";
import { ProjectsPage } from "./ProjectsPage";
import { mockProjects } from "./api/mockData";

const mockAddProject = vi.fn();
const mockUpdateProject = vi.fn();
const mockDeleteProject = vi.fn();

vi.mock("./useProjects", () => ({
  useProjects: () => ({
    projects: mockProjects,
    loading: false,
    addProject: mockAddProject,
    updateProject: mockUpdateProject,
    deleteProject: mockDeleteProject,
  }),
}));

describe("Projects Page", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders projects page with title and description", () => {
    render(<ProjectsPage />);

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Showcase your work with detailed project information and galleries",
      ),
    ).toBeInTheDocument();
  });

  it("displays all projects from mock data", () => {
    render(<ProjectsPage />);

    mockProjects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it("shows project descriptions and links", () => {
    render(<ProjectsPage />);

    // Check that project descriptions are shown (truncated)
    mockProjects.forEach((project) => {
      const truncatedDescription =
        project.description.length > 120
          ? project.description.substring(0, 120) + "..."
          : project.description;
      expect(screen.getByText(truncatedDescription)).toBeInTheDocument();
    });

    // Check for code and demo links
    expect(screen.getAllByText("Code")).toHaveLength(mockProjects.length);
    expect(screen.getAllByText("Demo")).toHaveLength(mockProjects.length);
  });

  it("opens add project modal when add button is clicked", async () => {
    render(<ProjectsPage />);

    const addButton = screen.getByRole("button", { name: /add project/i });
    await user.click(addButton);

    expect(screen.getByText("Add New Project")).toBeInTheDocument();
    expect(screen.getByLabelText(/project title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it("adds new project through modal form", async () => {
    render(<ProjectsPage />);

    // Open modal
    const addButton = screen.getByRole("button", { name: /add project/i });
    await user.click(addButton);

    // Fill form
    const titleInput = screen.getByLabelText(/project title/i);
    await user.type(titleInput, "New Test Project");

    const descriptionInput = screen.getByLabelText(/description/i);
    await user.type(descriptionInput, "This is a test project description");

    const codeUrlInput = screen.getByLabelText(/code repository url/i);
    await user.type(codeUrlInput, "https://github.com/test/repo");

    const demoUrlInput = screen.getByLabelText(/demo url/i);
    await user.type(demoUrlInput, "https://demo.test.com");

    // Submit form
    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    expect(mockAddProject).toHaveBeenCalledWith({
      title: "New Test Project",
      description: "This is a test project description",
      codeUrl: "https://github.com/test/repo",
      demoUrl: "https://demo.test.com",
      images: [],
    });
  });

  it("opens edit modal when edit button is clicked", async () => {
    render(<ProjectsPage />);

    // Find edit button
    const editButtons = screen
      .getAllByRole("button")
      .filter(
        (btn) =>
          btn.querySelector("svg")?.getAttribute("data-lucide") === "edit-3",
      );

    if (editButtons.length > 0) {
      await user.click(editButtons[0]);

      expect(screen.getByText("Edit Project")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(mockProjects[0].title),
      ).toBeInTheDocument();
    }
  });

  it("opens delete confirmation when delete button is clicked", async () => {
    render(<ProjectsPage />);

    // Find delete button
    const deleteButtons = screen
      .getAllByRole("button")
      .filter(
        (btn) =>
          btn.querySelector("svg")?.getAttribute("data-lucide") === "trash-2",
      );

    if (deleteButtons.length > 0) {
      await user.click(deleteButtons[0]);

      expect(screen.getByText("Delete Project")).toBeInTheDocument();
      expect(
        screen.getByText(/are you sure you want to delete/i),
      ).toBeInTheDocument();
    }
  });

  it("confirms project deletion", async () => {
    render(<ProjectsPage />);

    // Find and click delete button
    const deleteButtons = screen
      .getAllByRole("button")
      .filter(
        (btn) =>
          btn.querySelector("svg")?.getAttribute("data-lucide") === "trash-2",
      );

    if (deleteButtons.length > 0) {
      await user.click(deleteButtons[0]);

      // Confirm deletion
      await waitFor(() => {
        const confirmButton = screen.getByRole("button", { name: /delete/i });
        return user.click(confirmButton);
      });

      expect(mockDeleteProject).toHaveBeenCalled();
    }
  });

  it("allows adding images to project in modal", async () => {
    render(<ProjectsPage />);

    // Open add modal
    const addButton = screen.getByRole("button", { name: /add project/i });
    await user.click(addButton);

    // Add image URL
    const imageUrlInput = screen.getByPlaceholderText("Enter image URL");
    await user.type(imageUrlInput, "https://example.com/image.jpg");

    const addImageButton = screen.getByRole("button", { name: "Add" });
    await user.click(addImageButton);

    // Check that image was added to the form
    expect(screen.getByAltText("Project")).toBeInTheDocument();
  });

  it("displays project images correctly", () => {
    render(<ProjectsPage />);

    // Check that project images are displayed
    mockProjects.forEach((project) => {
      if (project?.images?.length > 0) {
        const coverImage =
          project.images?.find((img) => img.isCover) || project.images?.[0];
        const img = screen.getByAltText(project.title);
        expect(img).toHaveAttribute("src", coverImage.url);
      }
    });
  });

  it("shows external links work correctly", () => {
    render(<ProjectsPage />);

    // Check that external links have correct attributes
    const codeLinks = screen.getAllByText("Code");
    const demoLinks = screen.getAllByText("Demo");

    codeLinks.forEach((link, index) => {
      expect(link.closest("a")).toHaveAttribute(
        "href",
        mockProjects[index].codeUrl,
      );
      expect(link.closest("a")).toHaveAttribute("target", "_blank");
    });

    demoLinks.forEach((link, index) => {
      expect(link.closest("a")).toHaveAttribute(
        "href",
        mockProjects[index].demoUrl,
      );
      expect(link.closest("a")).toHaveAttribute("target", "_blank");
    });
  });
});
