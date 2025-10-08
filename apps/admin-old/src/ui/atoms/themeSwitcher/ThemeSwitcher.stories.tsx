import type { Meta, StoryFn } from "@storybook/react";
import { type ComponentProps } from "react";

import { ThemeSwitcher } from "./ThemeSwitcher";

const meta: Meta<typeof ThemeSwitcher> = {
  component: ThemeSwitcher,
  title: "Atoms/ThemeSwitcher",
  tags: ["autodocs"],
  argTypes: {
    toggleDarkTheme: { action: "clicked", description: "Toggle dark theme" },
  },
};

export default meta;

const Template: StoryFn<ComponentProps<typeof ThemeSwitcher>> = (args) => {
  return (
    <div className="text-gray-900 bg-white dark:text-white dark:bg-gray-900 h-full w-full flex items-center justify-center p-6">
      <div className="mb-[-48px]">
        <ThemeSwitcher {...args} />
      </div>
    </div>
  );
};

export const _ThemeSwitcher = Template.bind({});
_ThemeSwitcher.args = {};
