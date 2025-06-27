import { type ComponentProps } from "react";

import type { Meta, StoryFn } from "@storybook/react";

import { ErrorMessage } from "./ErrorMessage";
import { Container } from "../../utils/Container";

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage,
  title: "Molecules/ErrorMessage",
  tags: ["autodocs"],
  argTypes: {
    errorMessage: { control: "text", description: "Error message" },
    errorDescription: { control: "text", description: "Error description" },
    address: { control: "text", description: "Address" },
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof ErrorMessage>> = (args) => (
  <Container>
    <ErrorMessage {...args} />
  </Container>
);

export const _ErrorMessage = Template.bind({});
_ErrorMessage.args = {
  errorMessage: "Error message",
  errorDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  address: "lorem.ipsum@dolor.sit",
};
_ErrorMessage.parameters = {
  backgrounds: {
    default: "light",
  },
};
