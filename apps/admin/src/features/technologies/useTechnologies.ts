import { useState, useEffect } from "react";

import { type CreateTechnologyData, type Technology, type UpdateTechnologyData } from "./types";
import { technologiesService } from "./api/technologiesService";
import { type UserTechnology } from "./validation/technologySchemas";

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [userTechnologies, setUserTechnologies] = useState<UserTechnology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTechnologies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await technologiesService.getTechnologies();
        setTechnologies(data);
      } catch (error) {
        console.error("Failed to load technologies:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    const loadUserTechnologies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await technologiesService.getUserTechnologies();
        if (data.length) setUserTechnologies(data);
      } catch (error) {
        console.error("Failed to load user technologies:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    loadTechnologies();
    loadUserTechnologies();
  }, []);

  const addTechnology = async (content: string, rating: number = 0): Promise<UserTechnology> => {
    try {
      const technologyData: CreateTechnologyData = { content, rating };
      const newTechnology = await technologiesService.createUserTechnology(technologyData);
      const updatedTechnologies = [
        ...userTechnologies.filter((tech) => tech.technologyId !== newTechnology.technologyId),
        newTechnology,
      ];
      if (updatedTechnologies.length) setUserTechnologies(updatedTechnologies);
      return newTechnology;
    } catch (error) {
      console.error("Failed to add technology:", error);
      throw error;
    }
  };

  const updateTechnology = async (id: string, updates: UpdateTechnologyData): Promise<void> => {
    try {
      const updatedTechnology = await technologiesService.updateUserTechnology(id, updates);
      const updatedTechnologies = userTechnologies.map((tech) => (tech.technologyId === id ? updatedTechnology : tech));
      if (updatedTechnologies.length) setUserTechnologies(updatedTechnologies);
    } catch (error) {
      console.error("Failed to update technology:", error);
      throw error;
    }
  };

  const deleteTechnology = async (id: string): Promise<void> => {
    try {
      await technologiesService.deleteUserTechnology(id);
      const updatedTechnologies = userTechnologies.filter((tech) => tech.technologyId !== id);
      if (updatedTechnologies.length) setUserTechnologies(updatedTechnologies);
    } catch (error) {
      console.error("Failed to delete technology:", error);
      throw error;
    }
  };

  return {
    technologies,
    userTechnologies,
    technologiesLoading: loading,
    error,
    addTechnology,
    updateTechnology,
    deleteTechnology,
  };
};
