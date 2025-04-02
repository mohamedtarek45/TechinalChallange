import { useDroppable } from "@dnd-kit/core";
import { memo } from "react";
import { Draggable } from "@/components/Draggable";
export const Droppable = memo(({ id, text, data }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    opacity: isOver ? 1 : 0.8,

  };

  return (
    <div className=" w-full h-full flex flex-col items-center min-h-[300px] px-1.5">
      <p>{text}</p>
      <div
        ref={setNodeRef}
        className=" w-full flex-1 border-1 max-h-[280px] border-black rounded-md"
        style={style}
      >
        {data.map((item, index) => {
          return (
            <Draggable item={item} id={`${item.id}`} key={item.id} />
          );
        })}
      </div>
    </div>
  );
});
