interface CaptionProps {
  children: string;
}

export const Caption = ({ children }: CaptionProps) => (
  <p className="text-xs font-bold text-gray-700 dark:text-white">{children}</p>
);
