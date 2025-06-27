import type { Meta, StoryObj } from "@storybook/react";

import { KanbanBoard } from "./kanbanBoard";
import { tasksMock } from "./fixtures";

const meta = {
  component: KanbanBoard,
  title: "Organisms/KanbanBoard",
  tags: ["autodocs"],
  argTypes: {
    tasks: {
      control: {
        type: "object",
        disabled: true,
      },
      description: "Array of tasks to be displayed in the Kanban board",
    },
    columnNames: {
      control: {
        type: "object",
        disabled: true,
      },
      description: "Object containing the names of the Kanban board columns",
    },
  },
} satisfies Meta<typeof KanbanBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columnNames: {
      PLANNED: "Todo",
      RUNNING: "In progress",
      COMPLETED: "Done",
    },
    tasks: tasksMock,
  },
};
