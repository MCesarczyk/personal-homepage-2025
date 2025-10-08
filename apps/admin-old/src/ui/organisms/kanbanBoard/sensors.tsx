import { type ComponentProps } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export const DragDropContainer = (props: ComponentProps<typeof DndContext>) => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext
      modifiers={[restrictToWindowEdges]}
      {...props}
      {...{ sensors }}
    />
  );
};
