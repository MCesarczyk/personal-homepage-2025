export const TECHNOLOGIES_URLS = {
  getTechnologies: "/technology",
  getUserTechnologies: "/user/technology",
  getUserTechnology: (id: string) => `/user/technology/${id}`,
  createUserTechnology: "/user/technology",
  updateUserTechnology: (id: string) => `/user/technology/${id}`,
  deleteUserTechnology: (id: string) => `/user/technology/${id}`,
};
