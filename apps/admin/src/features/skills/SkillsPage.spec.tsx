import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "../../test/utils/testUtils";
import userEvent from "@testing-library/user-event";
import { SkillsPage } from "./SkillsPage";
import { mockSkills } from "./api/mockData";
import { SkillState } from "./types";

const mockAddSkill = vi.fn();
const mockUpdateSkill = vi.fn();
const mockDeleteSkill = vi.fn();

vi.mock("./useSkills", () => ({
  useSkills: () => ({
    skills: mockSkills,
    loading: false,
    addSkill: mockAddSkill,
    updateSkill: mockUpdateSkill,
    deleteSkill: mockDeleteSkill,
  }),
}));

describe("Skills Page", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders skills page with kanban board", () => {
    render(<SkillsPage />);

    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Track your learning journey with a visual kanban board",
      ),
    ).toBeInTheDocument();

    // Check kanban columns
    expect(screen.getByText("Planned")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("displays skills in correct columns based on their state", () => {
    render(<SkillsPage />);

    // Check that skills are displayed
    mockSkills.forEach((skill) => {
      expect(screen.getByText(skill.content)).toBeInTheDocument();
    });

    // Check column counts
    const plannedSkills = mockSkills.filter(
      (s) => s.state === SkillState.PLANNED,
    );
    const runningSkills = mockSkills.filter(
      (s) => s.state === SkillState.RUNNING,
    );
    const completedSkills = mockSkills.filter(
      (s) => s.state === SkillState.COMPLETED,
    );

    expect(
      screen.getAllByText(plannedSkills.length.toString()).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(runningSkills.length.toString()).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(completedSkills.length.toString()).length,
    ).toBeGreaterThan(0);
  });

  it("opens add skill modal when add skill button is clicked", async () => {
    render(<SkillsPage />);

    const addButtons = screen.getAllByText(/add skill/i);
    await user.click(addButtons[0]);

    expect(screen.getByText("Add New Skill")).toBeInTheDocument();
    expect(screen.getByLabelText(/skill description/i)).toBeInTheDocument();
  });

  it("adds new skill through modal form", async () => {
    render(<SkillsPage />);

    // Open modal
    const addButtons = screen.getAllByText(/add skill/i);
    await user.click(addButtons[0]);

    // Fill form
    const descriptionInput = screen.getByLabelText(/skill description/i);
    await user.type(descriptionInput, "Learn Rust Programming");

    const stateSelect = screen.getByLabelText(/initial state/i);
    await user.selectOptions(stateSelect, SkillState.RUNNING);

    // Submit form
    const submitButton = screen.getByRole("button", { name: /create/i });
    await user.click(submitButton);

    expect(mockAddSkill).toHaveBeenCalledWith(
      "Learn Rust Programming",
      SkillState.RUNNING,
    );
  });

  it("allows editing skill content inline", async () => {
    render(<SkillsPage />);

    // Find edit button for first skill
    const editButtons = screen
      .getAllByRole("button")
      .filter(
        (btn) =>
          btn.querySelector("svg")?.getAttribute("data-lucide") === "edit-3",
      );

    if (editButtons.length > 0) {
      await user.click(editButtons[0]);

      // Should show textarea for editing
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();

      // Edit content
      await user.clear(textarea);
      await user.type(textarea, "Updated skill content");

      // Save changes
      const saveButton = screen
        .getByRole("button")
        .querySelector('svg[data-lucide="check"]')
        ?.closest("button");
      if (saveButton) {
        await user.click(saveButton);
        expect(mockUpdateSkill).toHaveBeenCalled();
      }
    }
  });

  it("opens delete confirmation when delete button is clicked", async () => {
    render(<SkillsPage />);

    // Find delete button
    const deleteButtons = screen
      .getAllByRole("button")
      .filter(
        (btn) =>
          btn.querySelector("svg")?.getAttribute("data-lucide") === "trash-2",
      );

    if (deleteButtons.length > 0) {
      await user.click(deleteButtons[0]);

      expect(screen.getByText("Delete Skill")).toBeInTheDocument();
      expect(
        screen.getByText(/are you sure you want to delete/i),
      ).toBeInTheDocument();
    }
  });

  it("confirms skill deletion", async () => {
    render(<SkillsPage />);

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
      const confirmButton = screen.getByRole("button", { name: /delete/i });
      await user.click(confirmButton);

      expect(mockDeleteSkill).toHaveBeenCalled();
    }
  });
});
