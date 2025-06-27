"use client";

import { usePathname } from "next/navigation";

import { Link } from "../../ui/atoms/link";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-4 text-xl capitalize">
        <li>
          <Link variant="SECONDARY" href="/admin/skills" current={pathname.includes("skills")}>
            skills
          </Link>
        </li>
        <li>
          <Link variant="SECONDARY" href="/admin/projects" current={pathname.includes("projects")}>
            projects
          </Link>
        </li>
      </ul>
    </nav>
  );
};
