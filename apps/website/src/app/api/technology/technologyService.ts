import { baseUrl } from "@/shared/constants";

export const technologyService = {
  getTechnologies: async () => {
    const technologyResponse = await fetch(`${baseUrl}/api/technology`, { next: { revalidate: 60 } });
    const technologiesData = await technologyResponse.json();
    if (technologiesData.message !== "Technology data") {
      console.error(technologiesData.message);
    }
    return { technologiesData };
  },
};
