import { type CSSProperties, forwardRef, type HTMLAttributes } from "react";
import { DragIcon } from "./DragIcon";

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
}

export const Handle = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <button
      className="cursor-move border-0 grid place-items-center background-transparent"
      ref={ref}
      {...props}
    >
      <DragIcon />
    </button>
  );
});
