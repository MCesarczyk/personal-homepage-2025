import { describe, it, expect } from "vitest";

import { skillsService } from "./skillsService";
import { SkillState } from "../types";
import { mockSkills } from "./mockData";

describe("skillsService", () => {
  it("should fetch all skills", async () => {
    const skills = await skillsService.getSkills();
    expect(skills.length).toBeGreaterThan(0);
    expect(skills).toEqual(mockSkills);
  });

  it("should fetch a single skill by id", async () => {
    const skill = await skillsService.getSkill("1");
    expect(skill).toHaveProperty("content");
    expect(skill).toHaveProperty("state");
    expect(skill).toHaveProperty("createdAt");
    expect(skill).toHaveProperty("updatedAt");
    expect(skill).toEqual(mockSkills[0]);
  });

  it("should throw if skill not found", async () => {
    await expect(skillsService.getSkill("99")).rejects.toThrow(
      "Failed to fetch skill with id: 99",
    );
  });

  it("should create a new skill", async () => {
    const newSkillData = { content: "Test Skill", state: SkillState.PLANNED };
    const created = await skillsService.createSkill(newSkillData);
    expect(created.content).toBe(newSkillData.content);
    expect(created.state).toBe(newSkillData.state);
    expect(created.id).toBeDefined();
    expect(created.createdAt).toBeDefined();
    expect(created).toEqual({
      ...newSkillData,
      id: created.id,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  });

  it("should update a skill", async () => {
    const updates = { content: "Updated Skill Content" };
    const updated = await skillsService.updateSkill("2", updates);
    expect(updated.content).toBe(updates.content);
    expect(updated.updatedAt).toBeDefined();
    expect(updated).toEqual({
      ...mockSkills[1],
      ...updates,
      updatedAt: updated.updatedAt,
    });
  });

  it("should throw if update skill not found", async () => {
    await expect(
      skillsService.updateSkill("99", { content: "Nope" }),
    ).rejects.toThrow("Failed to update skill with id: 99");
  });

  it("should delete a skill", async () => {
    await expect(skillsService.deleteSkill("3")).resolves.toBeUndefined();
  });

  it("should throw if deleting non-existent skill", async () => {
    await expect(skillsService.deleteSkill("99")).rejects.toThrow(
      "Failed to delete skill with id: 99",
    );
  });
});
