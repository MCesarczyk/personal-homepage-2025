import { type Repo } from "./types";

export const sampleRepositories: Repo[] = [
  {
    id: 1,
    name: "React",
    description: "A JavaScript library for building user interfaces",
    demoLink: "https://reactjs.org/",
    codeLink: "https://github.com/facebook/react",
    images: [
      {
        id: 1,
        alt: "React Logo",
        url: "https://reactjs.org/logo-og.png",
      },
    ],
  },
  {
    id: 2,
    name: "Angular",
    description: "One framework. Mobile & desktop",
    demoLink: "https://angular.io/",
    codeLink: "https://github.com/angular/angular",
    images: [
      {
        id: 1,
        alt: "Angular Logo",
        url: "https://angular.io/assets/images/logos/angular/angular.png",
      },
    ],
  },
  {
    id: 3,
    name: "Vue",
    description: "The Progressive JavaScript Framework",
    demoLink: "https://vuejs.org/",
    codeLink: "https://github.com/vuejs/vue",
    images: [
      {
        id: 1,
        alt: "Vue Logo",
        url: "https://vuejs.org/images/logo.png",
      },
    ],
  },
  {
    id: 4,
    name: "Svelte",
    description: "Cybernetically enhanced    web apps",
    demoLink: "https://svelte.dev/",
    codeLink: "https://github.com/sveltejs/svelte",
    images: [
      {
        id: 1,
        alt: "Svelte Logo",
        url: "https://svelte.dev/svelte-logo-horizontal.svg",
      },
    ],
  },
];
