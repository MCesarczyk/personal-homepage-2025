import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../app/routes";
import { skillsService } from "../features/skills/api/skillsService";
import { List } from "../ui/molecules/list";

export const DashboardPage = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    skillsService.getSkills().then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <div className="mx-4 my-20 lg:mx-20">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border-2 border-solid border-slate-700 rounded-lg flex flex-col gap-2 bg-slate-400">
          <h2 className="text-xl">Skills</h2>
          <List items={skills} />
          <Link to={ROUTES.SKILLS} className="text-blue-700">
            Edit Skills
          </Link>
        </div>
        <div className="p-4 border-2 border-solid border-slate-700 rounded-lg flex flex-col gap-2 bg-slate-400">
          <h2 className="text-xl">Projects</h2>
          <List
            items={[
              { id: "1", content: "Project 1" },
              { id: "2", content: "Project 2" },
            ]}
          />
          <Link to={"#"} className="text-blue-700">
            Edit Projects
          </Link>
        </div>
      </div>
    </div>
  );
};
