import { ExternalLink, Github, Edit3, Trash2, Image } from "lucide-react";

import { type Project } from "./types";
import { Card } from "../../shared/ui/Card";
import { Button } from "../../shared/ui/Button";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  const coverImage = project?.images?.find((img) => img.isCover) || project?.images?.[0];
  const truncatedDescription =
    project.description.length > 120 ? project.description.substring(0, 120) + "..." : project.description;

  return (
    <Card padding="none" className="overflow-hidden group">
      <div className="relative">
        {coverImage ? (
          <img
            src={coverImage.url}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <Image className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-50 mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{truncatedDescription}</p>
        </div>

        <div className="flex space-x-2">
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-gray-200 hover:text-gray-500 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </a>
          )}
        </div>

        <div className="flex space-x-2 pt-2 border-t border-gray-100">
          <Button variant="ghost" size="sm" onClick={() => onEdit(project)} className="flex-1">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(project.id)} className="flex-1">
            <Trash2 className="w-4 h-4 mr-2 text-red-500" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
