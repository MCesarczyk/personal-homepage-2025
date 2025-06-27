"use client";

import type { Meta, StoryFn } from "@storybook/react";
import { type ComponentProps } from "react";

import { DownloadButton } from "./DownloadButton";

const meta: Meta<typeof DownloadButton> = {
  component: DownloadButton,
  title: "Molecules/DownloadButton",
  tags: ["autodocs"],
  argTypes: {
    fileLocation: { control: "text", description: "File location" },
    fileName: { control: "text", description: "File name" },
    buttonText: { control: "text", description: "Button text" },
  },
  args: {
    fileLocation: "/sample.pdf",
    fileName: "Blue sky printing.pdf",
    buttonText: "Download PDF",
  },
};
export default meta;

export const _DownloadButton: StoryFn<ComponentProps<typeof DownloadButton>> = (args) => <DownloadButton {...args} />;
