import { Technology, UserTechnology } from "../validation/technologySchemas";

export const mockTechnologies: Technology[] = [
  {
    id: "1",
    content: "React",
  },
  {
    id: "2",
    content: "TypeScript",
  },
  {
    id: "3",
    content: "Node.js",
  },
  {
    id: "4",
    content: "Python",
  },
  {
    id: "5",
    content: "PostgreSQL",
  },
  {
    id: "6",
    content: "Docker",
  },
];

export const mockUserTechnologies: UserTechnology[] = [
  {
    technologyId: "1",
    content: "React",
    rating: 5,
    createdAt: new Date().toISOString() as string,
    updatedAt: new Date().toISOString() as string,
  },
  {
    technologyId: "2",
    content: "TypeScript",
    rating: 4,
    createdAt: new Date().toISOString() as string,
    updatedAt: new Date().toISOString() as string,
  },
  {
    technologyId: "3",
    content: "Node.js",
    rating: 4,
    createdAt: new Date().toISOString() as string,
    updatedAt: new Date().toISOString() as string,
  },
];
