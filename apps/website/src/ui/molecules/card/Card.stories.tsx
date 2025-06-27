import { type ComponentProps } from "react";
import type { Meta, StoryFn } from "@storybook/react";

import { Card } from "./Card";
import { Container } from "../../atoms/Container";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "Molecules/Card",
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text", description: "Content" },
    state: { control: "text", description: "State" },
    changeState: { action: "changed", description: "State change event" },
    editSkill: { action: "edit", description: "Edit event" },
    deleteSkill: { action: "delete", description: "Delete event" },
  },
};
export default meta;

const Template: StoryFn<ComponentProps<typeof Card>> = (args) => (
  <Container>
    <Card {...args} />
  </Container>
);

export const _Card: StoryFn<ComponentProps<typeof Card>> = Template.bind({});
_Card.args = {
  content: "Art history PhD",
  state: "PLANNED",
};
