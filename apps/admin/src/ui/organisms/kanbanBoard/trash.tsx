import { useDroppable } from "@dnd-kit/core";

export function Trash() {
  const { setNodeRef } = useDroppable({
    id: "REMOVE",
  });
  return (
    <div
      ref={setNodeRef}
      className="p-2 flex items-center text-xl rounded-sm bg-red-600 text-white"
    >
      Delete 🗑
    </div>
  );
}
