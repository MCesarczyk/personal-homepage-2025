import type { Meta, StoryFn } from "@storybook/react";
import { type ComponentProps } from "react";

import { Footer } from "./Footer";
import { footerThumbnails } from "../../organisms/footer/footerThumbnailsSample";

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: "Organisms/Footer",
  tags: ["autodocs"],
  argTypes: {
    address: { control: "text", description: "Address" },
    cvFileLocation: { control: "text", description: "CV file location" },
    cvFileName: { control: "text", description: "CV file name" },
    footerThumbnails: { control: "disabled", description: "Footer thumbnails" },
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof Footer>> = (args) => (
  <div className="text-gray-950 dark:text-white">
    <Footer {...args} />
  </div>
);

export const _Footer = Template.bind({});
_Footer.args = {
  address: "lorem.ipsum@dolor.sit",
  cvFileLocation: "/DummyCV.pdf",
  cvFileName: "John Doe CV.pdf",
  footerThumbnails: footerThumbnails,
};
_Footer.parameters = {
  backgrounds: {
    default: "light",
  },
};
