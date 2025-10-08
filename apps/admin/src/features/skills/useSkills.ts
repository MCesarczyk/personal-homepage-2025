import { useState, useEffect } from "react";

import { CreateSkillData, Skill, SkillState, UpdateSkillData } from "./types";
import { skillsService } from "./api/skillsService";

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await skillsService.getSkills();
        setSkills(data);
      } catch (error) {
        console.error("Failed to load skills:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const addSkill = async (
    content: string,
    state: SkillState = SkillState.PLANNED,
  ): Promise<Skill> => {
    try {
      const skillData: CreateSkillData = { content, state };
      const newSkill = await skillsService.createSkill(skillData);
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      return newSkill;
    } catch (error) {
      console.error("Failed to add skill:", error);
      throw error;
    }
  };

  const updateSkill = async (
    id: string,
    updates: UpdateSkillData,
  ): Promise<void> => {
    try {
      const updatedSkill = await skillsService.updateSkill(id, updates);
      const updatedSkills = skills.map((skill) =>
        skill.id === id ? updatedSkill : skill,
      );
      setSkills(updatedSkills);
    } catch (error) {
      console.error("Failed to update skill:", error);
      throw error;
    }
  };

  const deleteSkill = async (id: string): Promise<void> => {
    try {
      await skillsService.deleteSkill(id);
      const updatedSkills = skills.filter((skill) => skill.id !== id);
      setSkills(updatedSkills);
    } catch (error) {
      console.error("Failed to delete skill:", error);
      throw error;
    }
  };

  const moveSkill = async (id: string, newState: SkillState): Promise<void> => {
    await updateSkill(id, { state: newState });
  };

  return {
    skills,
    skillsLoading: loading,
    error,
    addSkill,
    updateSkill,
    deleteSkill,
    moveSkill,
  };
};
