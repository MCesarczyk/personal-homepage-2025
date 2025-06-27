import { useState } from "react";
import { rectIntersection } from "@dnd-kit/core";

import { KanbanLane } from "./kanbanLane";
import { AddCard } from "./addCard";
import { type ColumnNames, type Task } from "./types";
import { filterTasksByState } from "./helpers";
import { DragDropContainer } from "./sensors";
import { Trash } from "./trash";
import { Button } from "../../atoms/button";

interface Props {
  tasks: Task[];
  columnNames?: ColumnNames;
}

export function KanbanBoard({ columnNames, tasks: initialTasks }: Props) {
  const [tasks, setTasks] = useState<Array<Task>>(() => [...initialTasks]);
  const [proposedTasks, setProposedTasks] = useState<Array<Task>>([]);

  const [confirmationPrompt, setConfirmationPrompt] = useState(false);

  const onItemDelete = () => {
    setConfirmationPrompt(true);

    setTimeout(() => {
      setConfirmationPrompt(false);
      setProposedTasks([]);
    }, 2_000);
  };

  const onDeleteConfirmation = () => {
    setTasks([...proposedTasks]);
    setConfirmationPrompt(false);
    setProposedTasks([]);
  };

  const addNewCard = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <DragDropContainer
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        const container = e.over?.id;
        const taskId = e.active.data.current?.id ?? "";
        const parent = e.active.data.current?.parent;

        const currentTask = tasks.find((task) => task.id === taskId);

        if (container === undefined && parent === "PLANNED") {
          return;
        }

        const newTasks = tasks.filter((task) => task.id !== taskId);

        if (!currentTask) {
          return;
        }

        switch (container) {
          case "REMOVE":
            onItemDelete();
            setProposedTasks([...newTasks]);
            break;
          case "COMPLETED":
            setTasks([...newTasks, { ...currentTask, state: "COMPLETED" }]);
            break;
          case "RUNNING":
            setTasks([...newTasks, { ...currentTask, state: "RUNNING" }]);
            break;
          default:
            setTasks([...newTasks, { ...currentTask, state: "PLANNED" }]);
        }
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-1 py-4">
          <AddCard addCard={addNewCard} />
          {confirmationPrompt ? (
            <Button variant="PRIMARY" onClick={onDeleteConfirmation}>
              Confirm
            </Button>
          ) : (
            <Trash />
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <KanbanLane
            title={columnNames?.PLANNED || "Planned"}
            state={"PLANNED"}
            items={filterTasksByState(tasks, "PLANNED")}
          />
          <KanbanLane
            title={columnNames?.RUNNING || "Running"}
            state={"RUNNING"}
            items={filterTasksByState(tasks, "RUNNING")}
          />
          <KanbanLane
            title={columnNames?.COMPLETED || "Completed"}
            state={"COMPLETED"}
            items={filterTasksByState(tasks, "COMPLETED")}
          />
        </div>
      </div>
    </DragDropContainer>
  );
}
