import { describe, it, expect } from "vitest";

import { technologiesService } from "./technologiesService";
import { mockTechnologies, mockUserTechnologies } from "./mockData";

describe("technologiesService", () => {
  it("should fetch all technologies", async () => {
    const technologies = await technologiesService.getTechnologies();
    expect(technologies.length).toBeGreaterThan(0);
    expect(technologies).toEqual(mockTechnologies);
  });

  it("should fetch a single technology by id", async () => {
    const technology = await technologiesService.getUserTechnology("1");
    expect(technology).toEqual(mockUserTechnologies[0]);
  });

  it("should throw if technology not found", async () => {
    await expect(technologiesService.getUserTechnology("99")).rejects.toThrow(
      "Failed to fetch user technology with id: 99",
    );
  });

  it("should create a new technology", async () => {
    const newTechnologyData = {
      technologyId: "123",
      content: "Test Tech",
      rating: 5,
    };
    const created =
      await technologiesService.createUserTechnology(newTechnologyData);
    expect(created.content).toBe(newTechnologyData.content);
    expect(created.rating).toBe(newTechnologyData.rating);
    expect(created.technologyId).toBeDefined();
    expect(created.createdAt).toBeDefined();
    expect(created).toEqual({
      ...newTechnologyData,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  });

  it("should update a technology", async () => {
    const updates = { id: "2", content: "Updated Tech", rating: 4 };
    const updated = await technologiesService.updateUserTechnology(
      "2",
      updates,
    );
    expect(updated.rating).toBe(updates.rating);
    expect(updated.updatedAt).toBeDefined();
    expect(updated).toEqual({
      content: updates.content,
      updatedAt: updated.updatedAt,
      createdAt: updated.createdAt,
      technologyId: "2",
      rating: updates.rating,
    });
  });

  it("should throw if update technology not found", async () => {
    await expect(
      technologiesService.updateUserTechnology("99", { content: "Nope" }),
    ).rejects.toThrow("Failed to update user technology with id: 99");
  });

  it("should delete a technology", async () => {
    await expect(
      technologiesService.deleteUserTechnology("3"),
    ).resolves.toBeUndefined();
  });

  it("should throw if deleting non-existent technology", async () => {
    await expect(
      technologiesService.deleteUserTechnology("99"),
    ).rejects.toThrow("Failed to delete user technology with id: 99");
  });
});
