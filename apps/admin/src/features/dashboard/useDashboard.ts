import { useMemo } from "react";

import { DashboardStats } from "./types";
import { useTechnologies } from "../technologies/useTechnologies";
import { useSkills } from "../skills/useSkills";
import { useProjects } from "../projects/useProjects";
import { SkillState } from "../skills/types";

export const useDashboard = () => {
  const { userTechnologies: rawTech, technologiesLoading } = useTechnologies();
  const { skills: rawSkills, skillsLoading } = useSkills();
  const { projects: rawProj, projectsLoading } = useProjects();

  const skills = useMemo(() => rawSkills ?? [], [rawSkills]);
  const projects = useMemo(() => rawProj ?? [], [rawProj]);
  const userTechnologies = useMemo(() => rawTech ?? [], [rawTech]);

  const stats: DashboardStats = useMemo(() => {
    return {
      technologiesCount: userTechnologies.length,
      skillsCount: skills.length,
      projectsCount: projects.length,
      completedSkillsCount: skills.filter(
        (skill) => skill.state === SkillState.COMPLETED,
      ).length,
    };
  }, [userTechnologies, skills, projects]);

  const recentTechnologies = useMemo(
    () =>
      [...userTechnologies]
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        .slice(0, 3),
    [userTechnologies],
  );

  const recentSkills = useMemo(
    () =>
      [...skills]
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        .slice(0, 3),
    [skills],
  );

  const recentProjects = useMemo(
    () =>
      [...projects]
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        .slice(0, 3),
    [projects],
  );

  return {
    stats,
    recentTechnologies,
    technologiesLoading,
    recentSkills,
    skillsLoading,
    recentProjects,
    projectsLoading,
  };
};
