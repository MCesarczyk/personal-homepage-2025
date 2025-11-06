import Image from "next/image";
import dynamic from "next/dynamic";
import { Header, Section, Footer, footerThumbnails, Gallery } from "@/ui";

import { ADDRESS, AUTHOR_DESCRIPTION, AUTHOR_NAME, portrait } from "@/assets";
import { skillService } from "@/app/api/skill/skillService";
import { technologyService } from "@/app/api/technology/technologyService";
import { projectService } from "@/app/api/project/projectService";

const Logger = dynamic(() => import("./AppVersionLogger"), { ssr: false });

export default async function Index() {
  const { skillsData } = await skillService.getSkills();

  const { technologiesData } = await technologyService.getTechnologies();

  const { projectsData } = await projectService.getProjects();

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
      {projectsData.success ? (
        <Gallery
          title={"Portfolio"}
          subtitle={"My recent projects"}
          status={"success"}
          repos={projectsData.data.map(
            (project: {
              id: string;
              title: string;
              description: string;
              codeUrl?: string;
              demoUrl?: string;
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
      ) : (
        <h3 className="text-xl text-center py-8">No projects to display at the moment.</h3>
      )}
      <Footer
        address={ADDRESS}
        cvFileLocation="/CV-EN.pdf"
        cvFileName="Michał Cesarczyk CV.pdf"
        {...{ footerThumbnails }}
      />
    </div>
  );
}
