import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const sampleOptions = [
  {
    label: "Option 1",
    value: "option1",
  },
  {
    label: "Option 2",
    value: "option2",
  },
  {
    label: "Option 3",
    value: "option3",
  },
];

const meta = {
  title: "Atoms/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const _Select: Story = {
  args: { options: sampleOptions },
};
