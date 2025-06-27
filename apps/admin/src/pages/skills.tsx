import { KanbanBoard } from "../ui/organisms/kanbanBoard";
import { tasksMock } from "../ui/organisms/kanbanBoard/fixtures";

export const SkillsPage = () => {
  return (
    <div className="m-20">
      <h1 className="text-2xl mb-4">Skills page</h1>
      <KanbanBoard tasks={tasksMock} />
    </div>
  );
};
