import { useState, useEffect } from "react";
import { Star, Trash2, Upload } from "lucide-react";

import { Project, ProjectImage } from "./types";
import { Modal } from "../../shared/ui/Modal";
import { Button } from "../../shared/ui/Button";
import {
  CreateProjectData,
  createProjectSchema,
  UpdateProjectData,
  updateProjectSchema,
} from "./validation/projectSchemas";
import { formatValidationErrors } from "../../shared/utils/validation";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: CreateProjectData) => void;
  onUpdate?: (id: string, updates: Partial<Project>) => void;
  project?: Project;
}

export const ProjectModal = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  project,
}: ProjectModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    codeUrl: "",
    demoUrl: "",
    images: [] as ProjectImage[],
  });

  const [newImageUrl, setNewImageUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        codeUrl: project.codeUrl || "",
        demoUrl: project.demoUrl || "",
        images: project.images,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        codeUrl: "",
        demoUrl: "",
        images: [],
      });
    }
    setNewImageUrl("");
    setErrors({});
  }, [project, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const schema = project ? updateProjectSchema : createProjectSchema;
    const result = schema.safeParse(formData);

    if (!result.success) {
      const validationErrors = formatValidationErrors(result.error);
      setErrors(validationErrors);
      return;
    }

    try {
      if (project && onUpdate) {
        onUpdate(project.id, result.data as UpdateProjectData);
      } else {
        onSave(result.data as CreateProjectData);
      }
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      const newImage: ProjectImage = {
        id: Date.now().toString(),
        url: newImageUrl.trim(),
        isCover: formData.images?.length === 0,
        fileName: newImageUrl.split("/").pop() || "image",
      };
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), newImage],
      }));
      setNewImageUrl("");
    }
  };

  const removeImage = (imageId: string) => {
    const updatedImages = formData.images.filter((img) => img.id !== imageId);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const setCoverImage = (imageId: string) => {
    const updatedImages = formData.images.map((img) => ({
      ...img,
      isCover: img.id === imageId,
    }));
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? "Edit Project" : "Add New Project"}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Project Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="demoUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Demo URL
            </label>
            <input
              type="url"
              id="demoUrl"
              value={formData.demoUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, demoUrl: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://demo.example.com"
            />
            {errors.demoUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.demoUrl}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="codeUrl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Code Repository URL
          </label>
          <input
            type="url"
            id="codeUrl"
            value={formData.codeUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, codeUrl: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://github.com/username/repo"
          />
          {errors.codeUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.codeUrl}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Images
          </label>

          <div className="flex space-x-2 mb-4">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter image URL"
            />
            <Button
              type="button"
              onClick={addImage}
              disabled={!newImageUrl.trim()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {formData.images?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url}
                    alt="Project"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                      <Button
                        type="button"
                        size="sm"
                        variant={image.isCover ? "primary" : "secondary"}
                        onClick={() => setCoverImage(image.id)}
                      >
                        <Star className="w-3 h-3" />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="danger"
                        onClick={() => removeImage(image.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  {image.isCover && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Cover
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-3 pt-6 border-t border-gray-500">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {project ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
