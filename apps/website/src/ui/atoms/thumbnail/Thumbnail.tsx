interface ThumbnailProps {
  id: number;
  icon: () => JSX.Element;
  url: string;
  local?: boolean;
}

export const Thumbnail = ({ id, icon: Icon, url, local }: ThumbnailProps) => {
  return (
    <div
      className="w-8 m-4 sm:w-10 sm:m-5 md:w-11 md:m-6 lg:w-12 lg:m-6 transition-all duration-500 text-blue-800 dark:text-blue-600 hover:brightness-150 hover:scale-110"
      key={id}
    >
      <a href={url} target={`${local ? "_self" : "_blank"}`} rel="noopener noreferrer">
        <Icon />
      </a>
    </div>
  );
};
