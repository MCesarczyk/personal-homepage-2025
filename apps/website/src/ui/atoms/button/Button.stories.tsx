"use client";

import type { Meta, StoryFn } from "@storybook/react";
import { type ComponentProps } from "react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Atoms/Button",
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "radio", options: ["PRIMARY", "SECONDARY"] }, description: "Button variant" },
    children: { control: "text", description: "Button text" },
    onClick: { action: "clicked", description: "Click event" },
  },
  args: {
    variant: "PRIMARY",
    children: "Button",
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "PRIMARY",
  children: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "SECONDARY",
  children: "Button",
};
