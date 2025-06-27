import { type ComponentProps } from "react";
import type { Meta, StoryFn } from "@storybook/react";

import { Gallery } from "./Gallery";
import { sampleRepositories } from "./fixtures";

const meta: Meta<typeof Gallery> = {
  component: Gallery,
  title: "Organisms/Gallery",
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "Title" },
    subtitle: { control: "text", description: "Subtitle" },
    status: {
      control: "radio",
      options: ["loading", "error", "success"],
      description: "Status",
    },
    repos: { control: "disable", description: "Repositories list" },
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof Gallery>> = (args) => (
  <div className="text-gray-950 dark:text-white">
    <Gallery {...args} />
  </div>
);

export const _Gallery: StoryFn<ComponentProps<typeof Gallery>> = Template.bind({});
_Gallery.args = {
  title: "Title",
  subtitle: "Subtitle",
  status: "success",
  repos: sampleRepositories,
};
_Gallery.parameters = {
  backgrounds: {
    default: "light",
  },
};
