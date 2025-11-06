import { type StaticImageData } from "next/image";

interface Picture {
  id: string;
  alt: string;
  url: StaticImageData | string;
}

export interface Repo {
  id: string;
  name: string;
  description: string;
  demoLink?: string;
  codeLink?: string;
  images: Picture[];
}
