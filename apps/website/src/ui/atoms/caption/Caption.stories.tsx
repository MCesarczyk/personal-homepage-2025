import type { Meta, StoryFn } from "@storybook/react";
import { type ComponentProps } from "react";

import { Caption } from "./Caption";

const meta: Meta<typeof Caption> = {
  component: Caption,
  title: "Atoms/Caption",
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text", description: "Caption text" },
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof Caption>> = (args) => <Caption {...args} />;

export const _Caption = Template.bind({});
_Caption.args = {
  children: "Caption",
};
_Caption.parameters = {
  backgrounds: {
    default: "dark",
  },
};
