import { type ReactNode } from "react";

import { EnvelopeIcon } from "./EnvelopeIcon";
import { Caption, Link, PageTitle } from "../../atoms";

interface HeaderProps {
  name: string;
  description: string;
  Portrait: ReactNode;
}

export const Header = ({ name, description, Portrait }: HeaderProps) => (
  <header className="grid grid-cols-1 gap-0 md:grid-cols-[auto_1fr] items-center md:gap-16">
    <div>{Portrait}</div>
    <div>
      <Caption>THIS IS:</Caption>
      <PageTitle>{name}</PageTitle>
      <p className="mb-8">{description}</p>
      <Link variant="PRIMARY" href="#contact">
        <div className="w-6 h-5 mr-3 sm:mr-4 md:mr-5 sm:scale-110 md:scale-125">
          <EnvelopeIcon />
        </div>
        Contact
      </Link>
    </div>
  </header>
);
