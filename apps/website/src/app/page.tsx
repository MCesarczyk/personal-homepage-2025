import Image from "next/image";
import dynamic from "next/dynamic";
import { Header, Section, Footer, footerThumbnails, Gallery } from "@/ui";

import { ADDRESS, AUTHOR_DESCRIPTION, AUTHOR_NAME, learning, goals, portrait, skills } from "@/assets";
import { sampleRepositories } from "@/app/repositories";

const Logger = dynamic(() => import("./AppVersionLogger"), { ssr: false });

export default async function Index() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const skillResponse = await fetch(`${baseUrl}/api/skill`, { next: { revalidate: 60 } });
  const skillsData = await skillResponse.json();

  const technologyResponse = await fetch(`${baseUrl}/api/technology`, { next: { revalidate: 60 } });
  const technologiesData = await technologyResponse.json();

  const projectResponse = await fetch(`${baseUrl}/api/project`, { next: { revalidate: 60 } });
  const projectsData = await projectResponse.json();

  return (
    <div id="home">
      <Logger />
      <Header
        name={AUTHOR_NAME}
        description={AUTHOR_DESCRIPTION}
        Portrait={<Image src={portrait} priority alt="portrait" height={384} />}
      />
      <Section title={"My skills"} elements={skills} />
      <Section title={"Things I'm learning right now"} elements={learning} />
      <Section title={"My next goals"} elements={goals} />
      <Gallery
        title={"Portfolio"}
        subtitle={"My recent projects"}
        status={"success"}
        repos={sampleRepositories.map((repo) => ({
          id: repo.id,
          name: repo.title,
          description: repo.description,
          codeLink: repo.html_url,
          demoLink: repo.homepage,
          images: repo.images,
        }))}
      />
      <Footer
        address={ADDRESS}
        cvFileLocation="/CV-EN.pdf"
        cvFileName="Michał Cesarczyk CV.pdf"
        {...{ footerThumbnails }}
      />
      ApiURL:
      <pre>{baseUrl}</pre>
      Skills:
      <pre>{JSON.stringify(skillsData.data, null, 2)}</pre>
      Technologies:
      <pre>{JSON.stringify(technologiesData.data, null, 2)}</pre>
      Projects:
      <pre>{JSON.stringify(projectsData.data, null, 2)}</pre>
    </div>
  );
}
