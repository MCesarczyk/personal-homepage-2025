import type { Meta, StoryObj } from "@storybook/react";

import { LoginForm } from "./loginForm";

const meta = {
  component: LoginForm,
  title: "Organisms/LoginForm",
  tags: ["autodocs"],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleLogin: async (username: string, password: string) => {
      console.log("Logging in with", username, password);
    },
  },
};
