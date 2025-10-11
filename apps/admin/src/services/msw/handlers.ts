import { skillsHandlers } from "../../features/skills/api/mockHandlers";
import { technologiesHandlers } from "../../features/technologies/api/mockHandlers";
import { projectsHandlers } from "../../features/projects/api/mockHandlers";
import { authHandlers } from "../../features/auth/api/mockHandlers";

export const handlers = [...skillsHandlers, ...technologiesHandlers, ...projectsHandlers, ...authHandlers];
