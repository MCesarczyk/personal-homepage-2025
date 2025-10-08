import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";

interface Props {
  handleLogin: (username: string, password: string) => Promise<void>;
}

export const LoginForm = ({ handleLogin }: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    handleLogin(username as string, password as string);
  };

  return (
    <form
      className="flex flex-col text-white bg-slate-800 p-8 gap-4"
      onSubmit={handleSubmit}
    >
      <label htmlFor="username">Username</label>
      <Input type="text" id="username" name="username" />
      <label htmlFor="password">Password</label>
      <Input type="password" id="password" name="password" />
      <Button variant="PRIMARY" type="submit">
        Submit
      </Button>
    </form>
  );
};
