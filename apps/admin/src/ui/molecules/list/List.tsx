interface Props {
  items: { id: string; content: string }[];
}

export const List = ({ items }: Props) => {
  return (
    <ul className="list-none m-0 p-4 border-2 border-solid border-slate-700 rounded-lg flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.id} className="">
          {item.content}
        </li>
      ))}
    </ul>
  );
};
