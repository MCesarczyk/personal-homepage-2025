import { KanbanBoard } from "../ui/organisms/kanbanBoard";
import { tasksMock } from "../ui/organisms/kanbanBoard/fixtures";

export const SkillsPage = () => {
  return (
    <div className="my-20 mx-4 md:mx-8 lg:mx-16 xl:mx-32">
      <h1 className="text-2xl mb-4">Skills page</h1>
      <KanbanBoard tasks={tasksMock} />
    </div>
  );
};
