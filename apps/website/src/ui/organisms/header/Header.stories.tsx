import type { Meta, StoryFn } from "@storybook/react";
import { type ComponentProps } from "react";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  component: Header,
  title: "Organisms/Header",
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text", description: "Author name" },
    description: { control: "text", description: "Header description" },
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof Header>> = (args) => (
  <div className="text-gray-950 dark:text-white">
    <Header {...args} />
  </div>
);

export const _Header = Template.bind({});
_Header.args = {
  name: "Author Name",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};
_Header.parameters = {
  backgrounds: {
    default: "dark",
  },
};
