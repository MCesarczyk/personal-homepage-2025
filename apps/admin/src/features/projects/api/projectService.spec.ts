import { describe, it, expect } from "vitest";

import { projectsService } from "./projectsService";
import { mockProjects } from "./mockData";

describe("projectsService", () => {
  it("should fetch all projects", async () => {
    const projects = await projectsService.getProjects();
    expect(projects).toHaveLength(mockProjects.length);
    expect(projects[0].title).toBe(mockProjects[0].title);
    expect(projects).toEqual(mockProjects);
  });

  it("should fetch a single project by id", async () => {
    const project = await projectsService.getProject("1");
    expect(project.title).toBe("E-commerce Platform");
    expect(project).toEqual(mockProjects[0]);
  });

  it("should throw if project not found", async () => {
    await expect(projectsService.getProject("99")).rejects.toThrow(
      "Failed to fetch project with id: 99",
    );
  });

  it("should create a new project", async () => {
    const newProject = {
      title: "New Test Project",
      description: "Test Desc",
      codeUrl: "https://github.com/example/new",
      demoUrl: "https://demo-new.vercel.app",
      images: [],
    };
    const created = await projectsService.createProject(newProject);
    expect(created.title).toBe(newProject.title);
    expect(created.id).toBeDefined();
    expect(created.createdAt).toBeDefined();
    expect(created).toEqual({
      ...newProject,
      id: created.id,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  });

  it("should update a project", async () => {
    const updates = { description: "Updated Desc" };
    const updated = await projectsService.updateProject("2", updates);
    expect(updated.description).toBe(updates.description);
    expect(updated.updatedAt).toBeDefined();
    expect(updated).toEqual({
      ...mockProjects[1],
      ...updates,
      updatedAt: updated.updatedAt,
    });
  });

  it("should throw if update project not found", async () => {
    await expect(
      projectsService.updateProject("99", { title: "New" }),
    ).rejects.toThrow("Failed to update project with id: 99");
  });

  it("should delete a project", async () => {
    await expect(projectsService.deleteProject("3")).resolves.toBeUndefined();
  });

  it("should throw if deleting non-existent project", async () => {
    await expect(projectsService.deleteProject("99")).rejects.toThrow(
      "Failed to delete project with id: 99",
    );
  });
});
