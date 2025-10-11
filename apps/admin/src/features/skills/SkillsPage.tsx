import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DragOverlay, rectIntersection } from "@dnd-kit/core";

import { useSkills } from "./useSkills";
import { type Skill, SkillState } from "./types";
import { ConfirmDialog } from "../../shared/ui/ConfirmDialog";
import { KanbanColumn } from "./KanbanColumn";
import { AddSkillModal } from "./AddSkillModal";
import { DragDropContainer } from "../../shared/utils/dndContainer";
import { SkillCard } from "./SkillCard";

export const SkillsPage = () => {
  const { skills, skillsLoading, addSkill, updateSkill, deleteSkill } = useSkills();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [displayedSkills, setDisplayedSkills] = useState<Skill[]>([]);

  useEffect(() => {
    setDisplayedSkills(skills);
  }, [skills]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [initialState, setInitialState] = useState<SkillState>(SkillState.PLANNED);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    id: string;
    name: string;
  }>({
    isOpen: false,
    id: "",
    name: "",
  });

  const handleAddSkill = (state: SkillState) => {
    setInitialState(state);
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const skill = skills.find((s) => s.id === id);
    if (skill) {
      setDeleteConfirm({ isOpen: true, id, name: skill.content });
    }
  };

  const confirmDelete = async () => {
    await deleteSkill(deleteConfirm.id);
    setDeleteConfirm({ isOpen: false, id: "", name: "" });
  };

  const skillsByState = {
    [SkillState.PLANNED]: displayedSkills.filter((skill) => skill.state === SkillState.PLANNED),
    [SkillState.RUNNING]: displayedSkills.filter((skill) => skill.state === SkillState.RUNNING),
    [SkillState.COMPLETED]: displayedSkills.filter((skill) => skill.state === SkillState.COMPLETED),
  };

  if (skillsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-fit">
      <div>
        <h1 className="text-3xl font-bold text-gray-50">Skills</h1>
        <p className="mt-2 text-gray-400">Track your learning journey with a visual kanban board</p>
      </div>

      <DragDropContainer
        collisionDetection={rectIntersection}
        onDragStart={(e) => {
          const skillId = e.active.data.current?.id ?? "";
          const skill = skills.find((s) => s.id === skillId);
          if (skill) {
            setActiveId(skill.id);
            setDisplayedSkills(skills.filter((s) => s.id !== skill.id));
          }
        }}
        onDragEnd={(e) => {
          const container = e.over?.id;
          const currentTask = skills.find((skill) => skill.id === activeId);

          if (!currentTask) {
            return;
          }

          switch (container) {
            case SkillState.COMPLETED:
              updateSkill(currentTask.id, { state: SkillState.COMPLETED });
              break;
            case SkillState.RUNNING:
              updateSkill(currentTask.id, { state: SkillState.RUNNING });
              break;
            default:
              updateSkill(currentTask.id, { state: SkillState.PLANNED });
          }
          setActiveId(null);
          setDisplayedSkills(skills);
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-fit">
          <KanbanColumn
            title="Planned"
            state={SkillState.PLANNED}
            skills={skillsByState[SkillState.PLANNED]}
            onUpdate={updateSkill}
            onDelete={handleDelete}
            onAdd={handleAddSkill}
            color="blue"
          />
          <KanbanColumn
            title="In Progress"
            state={SkillState.RUNNING}
            skills={skillsByState[SkillState.RUNNING]}
            onUpdate={updateSkill}
            onDelete={handleDelete}
            onAdd={handleAddSkill}
            color="yellow"
          />
          <KanbanColumn
            title="Completed"
            state={SkillState.COMPLETED}
            skills={skillsByState[SkillState.COMPLETED]}
            onUpdate={updateSkill}
            onDelete={handleDelete}
            onAdd={handleAddSkill}
            color="green"
          />
        </div>

        {createPortal(
          <DragOverlay dropAnimation={null}>
            <SkillCard
              key={activeId}
              index={0}
              skill={skills.find((s) => s.id === activeId) as Skill}
              onUpdate={() => {}}
              onDelete={() => {}}
            />
          </DragOverlay>,
          document.body,
        )}
      </DragDropContainer>

      <AddSkillModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addSkill}
        initialState={initialState}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: "", name: "" })}
        onConfirm={confirmDelete}
        title="Delete Skill"
        message={`Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
