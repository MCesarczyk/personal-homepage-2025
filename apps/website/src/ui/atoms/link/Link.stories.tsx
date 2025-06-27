import type { Meta, StoryFn } from "@storybook/react";
import { type ComponentProps } from "react";

import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  component: Link,
  title: "Atoms/Link",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["PRIMARY", "SECONDARY"],
      },
      description: "Link variant",
    },
    current: { control: "boolean", description: "Active state" },
    children: { control: "text", description: "Link text" },
    onClick: { action: "clicked", description: "Click event" },
  },
  args: {
    current: false,
    children: "Link",
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof Link>> = (args) => <Link {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "PRIMARY",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "SECONDARY",
};
