import { type ComponentProps } from "react";

type ValueAndLabel = {
  value: string;
  label: string;
};

type Props = {
  options: ValueAndLabel[];
};

export const Select = ({ options, ...rest }: ComponentProps<"select"> & Props) => {
  return (
    <select
      className="px-4 py-2 rounded text-black bg-slate-300 border-black border-2 outline-offset-0"
      {...{ options }}
      {...rest}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
