import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanbanCard";
import { type Task, type TaskState } from "./types";

interface KanbanLaneProps {
  title: string;
  state: TaskState;
  items: Task[];
}

export function KanbanLane({ title, state, items }: KanbanLaneProps) {
  const { setNodeRef } = useDroppable({
    id: state,
  });
  return (
    <div className="flex flex-col gap-2 min-h-fit border bg-slate-400 border-slate-700 rounded-lg p-4">
      <h4 className="text-xl capitalize">{title}</h4>
      <div className="flex-1 flex flex-col gap-2 rounded-lg" ref={setNodeRef}>
        {items.map((task, index) => (
          <KanbanCard task={task} key={task.id} index={index} parent={state} />
        ))}
      </div>
    </div>
  );
}
