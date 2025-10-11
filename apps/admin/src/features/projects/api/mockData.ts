import { type Project } from "../validation/projectSchemas";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.",
    codeUrl: "https://github.com/example/ecommerce",
    demoUrl: "https://demo-ecommerce.vercel.app",
    images: [
      {
        id: "1a",
        url: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
        fileName: "pexels-photo-3184360.jpeg",
        isCover: true,
      },
      {
        id: "1b",
        url: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800",
        fileName: "pexels-photo-4348401.jpeg",
        isCover: false,
      },
    ],
    createdAt: new Date("2024-01-01").toISOString() as unknown as Date,
    updatedAt: new Date("2024-01-10").toISOString() as unknown as Date,
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, team workspaces, and advanced project tracking capabilities.",
    codeUrl: "https://github.com/example/taskapp",
    demoUrl: "https://demo-tasks.vercel.app",
    images: [
      {
        id: "2a",
        url: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
        fileName: "pexels-photo-3184465.jpeg",
        isCover: true,
      },
    ],
    createdAt: new Date("2024-01-05").toISOString() as unknown as Date,
    updatedAt: new Date("2024-01-12").toISOString() as unknown as Date,
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description:
      "A beautiful weather dashboard with location-based forecasts, historical data visualization, and severe weather alerts.",
    codeUrl: "https://github.com/example/weather",
    demoUrl: "https://demo-weather.vercel.app",
    images: [
      {
        id: "3a",
        url: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
        fileName: "pexels-photo-1118873.jpeg",
        isCover: true,
      },
      {
        id: "3b",
        url: "https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&w=800",
        fileName: "pexels-photo-1446076.jpeg",
        isCover: false,
      },
      {
        id: "3c",
        url: "https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=800",
        fileName: "pexels-photo-1431822.jpeg",
        isCover: false,
      },
    ],
    createdAt: new Date("2024-01-08").toISOString() as unknown as Date,
    updatedAt: new Date("2024-01-14").toISOString() as unknown as Date,
  },
];
