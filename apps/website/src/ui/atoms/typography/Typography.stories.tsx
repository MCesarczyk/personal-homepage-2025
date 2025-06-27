"use client";

import type { Meta, StoryFn } from "@storybook/react";
import { type ComponentProps } from "react";
import { PageTitle } from "./Typography";

const meta: Meta<typeof PageTitle> = {
  component: PageTitle,
  title: "Atoms/Typography",
  argTypes: {
    children: { control: "text", description: "Tilte content" },
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof PageTitle>> = (args) => <PageTitle {...args} />;

export const _PageTitle = Template.bind({});
_PageTitle.args = {
  children: "Lorem ipsum",
};
