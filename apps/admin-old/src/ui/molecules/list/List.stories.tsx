import { type ComponentProps } from "react";

import type { Meta, StoryFn } from "@storybook/react";

import { List } from "./List";

const meta: Meta<typeof List> = {
  component: List,
  title: "Molecules/List",
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: {
        type: "object",
      },
      description: "List of items to display",
    },
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof List>> = (args) => (
  <List {...args} />
);

export const _List = Template.bind({});
_List.args = {
  items: [
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
  ],
};
_List.parameters = {
  backgrounds: {
    default: "light",
  },
};
