import { useState } from "react";
import { Plus, FolderOpen } from "lucide-react";
import { useProjects } from "./useProjects";
import { type Project } from "./types";
import { Button } from "../../shared/ui/Button";
import { ConfirmDialog } from "../../shared/ui/ConfirmDialog";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export const ProjectsPage = () => {
  const { projects, projectsLoading, addProject, updateProject, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: string;
    name: string;
  }>({
    isOpen: false,
    id: "",
    name: "",
  });

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(undefined);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProject(undefined);
  };

  const handleDelete = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setDeleteConfirm({ isOpen: true, id, name: project.title });
    }
  };

  const confirmDelete = async () => {
    await deleteProject(deleteConfirm.id);
    setDeleteConfirm({ isOpen: false, id: "", name: "" });
  };

  if (projectsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Projects</h1>
          <p className="mt-2 text-gray-400">Showcase your work with detailed project information and galleries</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No projects yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first project.</p>
          <div className="mt-6">
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={addProject}
        onUpdate={updateProject}
        project={editingProject}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: "", name: "" })}
        onConfirm={confirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
