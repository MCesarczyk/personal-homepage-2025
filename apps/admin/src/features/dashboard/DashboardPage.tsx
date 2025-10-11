import { Code, Target, FolderOpen, CheckCircle } from "lucide-react";

import { useDashboard } from "./useDashboard";
import { StatCard } from "./StatCard";
import { RecentSection } from "./RecentSection";

export const DashboardPage = () => {
  const {
    stats,
    recentTechnologies,
    technologiesLoading,
    recentSkills,
    skillsLoading,
    recentProjects,
    projectsLoading,
  } = useDashboard();

  return (
    <div className="space-y-8 bg-slate-150">
      <div>
        <h1 className="text-3xl font-bold text-gray-50">Dashboard</h1>
        <p className="mt-2 text-gray-400">
          Overview of your portfolio content and recent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Technologies"
          value={stats.technologiesCount}
          icon={Code}
          loading={technologiesLoading}
          color="blue"
        />
        <StatCard
          title="Skills"
          value={stats.skillsCount}
          icon={Target}
          loading={skillsLoading}
          color="purple"
        />
        <StatCard
          title="Projects"
          value={stats.projectsCount}
          icon={FolderOpen}
          loading={projectsLoading}
          color="green"
        />
        <StatCard
          title="Completed Skills"
          value={stats.completedSkillsCount}
          icon={CheckCircle}
          loading={skillsLoading}
          color="orange"
          subtitle={`${Math.round(
            (stats.completedSkillsCount / Math.max(stats.skillsCount, 1)) * 100,
          )}% completion`}
        />
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentSection
          title="Recent Technologies"
          items={recentTechnologies.map((tech) => ({
            id: tech.technologyId,
            name: tech.content,
            subtitle: `${tech.rating}/5 stars`,
          }))}
          linkTo="/technologies"
          emptyMessage="No technologies added yet"
        />

        <RecentSection
          title="Recent Skills"
          items={recentSkills.map((skill) => ({
            id: skill.id,
            name: skill.content,
            subtitle: skill.state.toLowerCase(),
          }))}
          linkTo="/skills"
          emptyMessage="No skills added yet"
        />

        <RecentSection
          title="Recent Projects"
          items={recentProjects.map((project) => ({
            id: project.id,
            name: project.title,
            subtitle: `${project?.images?.length} images`,
          }))}
          linkTo="/projects"
          emptyMessage="No projects added yet"
        />
      </div>
    </div>
  );
};
