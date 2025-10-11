import { z } from "zod";

export const dashboardStatsSchema = z.object({
  technologiesCount: z.number().int().nonnegative(),
  skillsCount: z.number().int().nonnegative(),
  projectsCount: z.number().int().nonnegative(),
  completedSkillsCount: z.number().int().nonnegative(),
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;
