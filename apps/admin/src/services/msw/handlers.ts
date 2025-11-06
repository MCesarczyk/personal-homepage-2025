import { authHandlers } from "../../features/auth/api/mockHandlers";
import { apiKeyHandlers } from "../../features/api-keys/api/mockHandlers";
import { skillsHandlers } from "../../features/skills/api/mockHandlers";
import { technologiesHandlers } from "../../features/technologies/api/mockHandlers";
import { projectsHandlers } from "../../features/projects/api/mockHandlers";

export const handlers = [
  ...authHandlers,
  ...apiKeyHandlers,
  ...skillsHandlers,
  ...technologiesHandlers,
  ...projectsHandlers,
];
