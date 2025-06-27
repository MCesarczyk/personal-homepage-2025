import Image from "next/image";
import dynamic from "next/dynamic";
import { Header, Section, Footer, footerThumbnails, Gallery } from "@/ui";

import { ADDRESS, AUTHOR_DESCRIPTION, AUTHOR_NAME, skills, learning, goals, portrait } from "@/assets";
import { sampleRepositories } from "@/app/repositories";

const Logger = dynamic(() => import("./AppVersionLogger"), { ssr: false });

export default async function Index() {
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
    </div>
  );
}
