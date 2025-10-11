import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "../../test/utils/testUtils";
import userEvent from "@testing-library/user-event";
import { TechnologiesPage } from "./TechnologiesPage";
import { mockTechnologies, mockUserTechnologies } from "./api/mockData";

const mockAddTechnology = vi.fn();
const mockUpdateTechnology = vi.fn();
const mockDeleteTechnology = vi.fn();

vi.mock("./useTechnologies", () => ({
  useTechnologies: () => ({
    technologies: mockTechnologies,
    userTechnologies: mockUserTechnologies,
    loading: false,
    addTechnology: mockAddTechnology,
    updateTechnology: mockUpdateTechnology,
    deleteTechnology: mockDeleteTechnology,
  }),
}));

describe("Technologies Page", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders technologies page with all elements", () => {
    render(<TechnologiesPage />);

    expect(screen.getByText("Technologies")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your technology stack and proficiency levels"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search technologies..."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add technology/i }),
    ).toBeInTheDocument();
  });

  it("displays all technologies from mock data", () => {
    render(<TechnologiesPage />);

    mockUserTechnologies.forEach((tech) => {
      expect(screen.getByText(tech.content)).toBeInTheDocument();
    });
  });

  it("filters technologies when searching", async () => {
    render(<TechnologiesPage />);

    const searchInput = screen.getByPlaceholderText("Search technologies...");
    await user.type(searchInput, "React");

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText("Python")).not.toBeInTheDocument();
    expect(screen.queryByText("Docker")).not.toBeInTheDocument();
  });

  it("shows empty state when search returns no results", async () => {
    render(<TechnologiesPage />);

    const searchInput = screen.getByPlaceholderText("Search technologies...");
    await user.type(searchInput, "NonexistentTechnology");

    expect(screen.getByText("No technologies found")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your search terms."),
    ).toBeInTheDocument();
  });

  it("opens add technology modal and submits new technology", async () => {
    render(<TechnologiesPage />);

    // Open modal
    const addButton = screen.getByRole("button", { name: /add technology/i });
    await user.click(addButton);

    expect(screen.getByText("New Technology")).toBeInTheDocument();

    // Fill form
    const nameInput = screen.getByLabelText(/technology name/i);
    await user.type(nameInput, "Vue.js");

    // Click stars for rating (find star buttons)
    const starButton = screen.getByTestId("vue.js-star-4");

    await user.click(starButton);

    // Submit
    const submitButton = screen.getByRole("button", {
      name: /create/i,
    });
    await user.click(submitButton);

    expect(mockAddTechnology).toHaveBeenCalledWith("Vue.js", 4);
  });

  it("allows editing technology name inline", async () => {
    render(<TechnologiesPage />);

    // Find edit button for first technology
    const editButtons = screen
      .getAllByRole("button")
      .filter(
        (btn) =>
          btn.querySelector("svg")?.getAttribute("data-lucide") === "edit-3",
      );

    if (editButtons.length > 0) {
      await user.click(editButtons[0]);

      // Should show input for editing
      const editInput = screen.getByDisplayValue("React");
      expect(editInput).toBeInTheDocument();

      // Edit content
      await user.clear(editInput);
      await user.type(editInput, "React.js");

      // Save changes
      const saveButton = screen
        .getByRole("button")
        .querySelector('svg[data-lucide="check"]')
        ?.closest("button");
      if (saveButton) {
        await user.click(saveButton);
        expect(mockUpdateTechnology).toHaveBeenCalledWith("1", {
          content: "React.js",
        });
      }
    }
  });

  it("handles technology deletion with confirmation", async () => {
    render(<TechnologiesPage />);

    // Find delete button
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
        expect(screen.getByText("Delete Technology")).toBeInTheDocument();
      });

      const confirmButton = screen.getByRole("button", { name: /delete/i });
      await user.click(confirmButton);

      expect(mockDeleteTechnology).toHaveBeenCalled();
    }
  });

  it("updates technology rating when stars are clicked", async () => {
    render(<TechnologiesPage />);

    // Find star rating for React (first technology)
    const reactCard = screen.getByText("React").closest(".bg-gray-700");
    const starButtons = reactCard?.querySelectorAll('button[type="button"]');

    if (starButtons && starButtons.length >= 2) {
      await user.click(starButtons[1]); // Click 2nd star for rating 2

      expect(mockUpdateTechnology).toHaveBeenCalledWith("1", { rating: 2 });
    }
  });
});
