import Image from "next/image";
import dynamic from "next/dynamic";
import { Header, Section, Footer, footerThumbnails, Gallery } from "@/ui";

import { ADDRESS, AUTHOR_DESCRIPTION, AUTHOR_NAME, portrait } from "@/assets";

const Logger = dynamic(() => import("./AppVersionLogger"), { ssr: false });

export default async function Index() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const skillResponse = await fetch(`${baseUrl}/api/skill`, { next: { revalidate: 60 } });
  const skillsData = await skillResponse.json();

  const technologyResponse = await fetch(`${baseUrl}/api/technology`, { next: { revalidate: 60 } });
  const technologiesData = await technologyResponse.json();

  const projectResponse = await fetch(`${baseUrl}/api/project`, { next: { revalidate: 60 } });
  const projectsData = await projectResponse.json();
  if (projectsData.message !== "Project data") {
    console.error(projectsData.message);
  }

  return (
    <div id="home">
      <Logger />
      <Header
        name={AUTHOR_NAME}
        description={AUTHOR_DESCRIPTION}
        Portrait={<Image src={portrait} priority alt="portrait" height={384} />}
      />
      <Section
        title={"Technologies"}
        elements={technologiesData.data.map((tech: { content: string }) => tech.content)}
      />
      <Section
        title={"My skills"}
        elements={skillsData.data
          .filter((skill: { state: string }) => skill.state === "COMPLETED")
          .map((skill: { content: string }) => skill.content)}
      />
      <Section
        title={"Things I'm learning right now"}
        elements={skillsData.data
          .filter((skill: { state: string }) => skill.state === "RUNNING")
          .map((skill: { content: string }) => skill.content)}
      />
      <Section
        title={"My next goals"}
        elements={skillsData.data
          .filter((skill: { state: string }) => skill.state === "PLANNED")
          .map((skill: { content: string }) => skill.content)}
      />
      <Gallery
        title={"Portfolio"}
        subtitle={"My recent projects"}
        status={"success"}
        repos={projectsData.data.map(
          (project: {
            id: string;
            title: string;
            description: string;
            codeUrl: string;
            demoUrl: string;
            images: { url: string; fileName: string }[];
          }) => ({
            id: project.id,
            name: project.title,
            description: project.description,
            codeLink: project.codeUrl,
            demoLink: project.demoUrl,
            images: project.images.map((img: { url: string; fileName: string }) => ({
              id: img.url,
              url: img.url,
              alt: img.fileName,
            })),
          }),
        )}
      />
      <Footer
        address={ADDRESS}
        cvFileLocation="/CV-EN.pdf"
        cvFileName="Michał Cesarczyk CV.pdf"
        {...{ footerThumbnails }}
      />
      <pre>{JSON.stringify(projectsData, null, 2)}</pre>
    </div>
  );
}
