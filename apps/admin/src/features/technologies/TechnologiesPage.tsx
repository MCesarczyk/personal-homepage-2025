import { useState } from "react";
import { Code, Plus, Search } from "lucide-react";
import { useTechnologies } from "./useTechnologies";
import { Button } from "../../shared/ui/Button";
import { ConfirmDialog } from "../../shared/ui/ConfirmDialog";
import { TechnologyCard } from "./TechnologyCard";
import { AddTechnologyModal } from "./AddTechnologyModal";

export const TechnologiesPage = () => {
  const {
    userTechnologies,
    technologiesLoading,
    addTechnology,
    updateTechnology,
    deleteTechnology,
  } = useTechnologies();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: string;
    name: string;
  }>({
    isOpen: false,
    id: "",
    name: "",
  });

  const filteredTechnologies = userTechnologies.filter((tech) =>
    tech.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    const tech = userTechnologies.find((t) => t.technologyId === id);
    if (tech) {
      setDeleteConfirm({ isOpen: true, id, name: tech.content });
    }
  };

  const confirmDelete = async () => {
    await deleteTechnology(deleteConfirm.id);
    setDeleteConfirm({ isOpen: false, id: "", name: "" });
  };

  if (technologiesLoading) {
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
          <h1 className="text-3xl font-bold text-gray-50">Technologies</h1>
          <p className="mt-2 text-gray-400">
            Manage your technology stack and proficiency levels
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Technology
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
        <input
          type="text"
          placeholder="Search technologies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-700 bg-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Technologies Grid */}
      {filteredTechnologies.length === 0 ? (
        <div className="text-center py-12">
          <Code className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No technologies found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery
              ? "Try adjusting your search terms."
              : "Get started by adding your first technology."}
          </p>
          {!searchQuery && (
            <div className="mt-6">
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Technology
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTechnologies.map((technology) => (
            <TechnologyCard
              key={technology.technologyId}
              technology={technology}
              onUpdate={updateTechnology}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <AddTechnologyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addTechnology}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: "", name: "" })}
        onConfirm={confirmDelete}
        title="Delete Technology"
        message={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
