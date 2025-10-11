import { useState, useEffect } from "react";

import { type CreateProjectData, type Project, type ProjectImage, type UpdateProjectData } from "./types";
import { projectsService } from "./api/projectsService";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await projectsService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const addProject = async (projectData: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> => {
    try {
      const createData: CreateProjectData = {
        title: projectData.title,
        description: projectData.description,
        codeUrl: projectData.codeUrl || "",
        demoUrl: projectData.demoUrl || "",
        images: projectData.images,
      };
      const newProject = await projectsService.createProject(createData);
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      return newProject;
    } catch (error) {
      console.error("Failed to add project:", error);
      throw error;
    }
  };

  const updateProject = async (id: string, updates: UpdateProjectData): Promise<void> => {
    try {
      const updatedProject = await projectsService.updateProject(id, updates);
      const updatedProjects = projects.map((project) => (project.id === id ? updatedProject : project));
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Failed to update project:", error);
      throw error;
    }
  };

  const deleteProject = async (id: string): Promise<void> => {
    try {
      await projectsService.deleteProject(id);
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Failed to delete project:", error);
      throw error;
    }
  };

  const addImageToProject = async (projectId: string, imageUrl: string): Promise<void> => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newImage: ProjectImage = {
      id: Date.now().toString(),
      url: imageUrl,
      isCover: project.images?.length === 0,
      fileName: imageUrl.split("/").pop() || "image",
    };

    await updateProject(projectId, {
      images: [...project.images, newImage],
    });
  };

  const removeImageFromProject = async (projectId: string, imageId: string): Promise<void> => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const updatedImages = project.images?.filter((img) => img.id !== imageId);
    await updateProject(projectId, { images: updatedImages });
  };

  const setCoverImage = async (projectId: string, imageId: string): Promise<void> => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const updatedImages = project.images?.map((img) => ({
      ...img,
      isCover: img.id === imageId,
    }));

    await updateProject(projectId, { images: updatedImages });
  };

  return {
    projects,
    projectsLoading: loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    addImageToProject,
    removeImageFromProject,
    setCoverImage,
  };
};
