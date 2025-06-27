import type { Meta, StoryFn } from "@storybook/react";
import { type ComponentProps } from "react";

import { Thumbnail } from "./Thumbnail";
import { Container } from "../../utils/Container";
import { GithubThumbnail } from "../../../assets";

const meta: Meta<typeof Thumbnail> = {
  component: Thumbnail,
  title: "Atoms/Thumbnail",
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text", description: "Thumbnail id" },
    icon: { control: "disabled", description: "Thumbnail icon" },
    url: { control: "text", description: "Thumbnail url" },
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof Thumbnail>> = (args) => (
  <Container>
    <Thumbnail {...args} />
  </Container>
);

export const _Thumbnail: StoryFn<ComponentProps<typeof Thumbnail>> = Template.bind({});
_Thumbnail.args = {
  id: 1,
  icon: GithubThumbnail,
  url: "https://example.com",
};
_Thumbnail.parameters = {
  backgrounds: {
    default: "light",
  },
};
