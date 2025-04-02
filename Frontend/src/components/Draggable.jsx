import React, { memo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";

export const Draggable = memo(({ item, id }) => {
  const nav = useNavigate();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const [isDragging, setIsDragging] = useState(false);
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        display: "hidden" 
      }
    : null;

  return (
    <button
      onMouseDown={() => setIsDragging(false)}
      onMouseMove={() => setIsDragging(true)}
      onMouseUp={(e) => {
        if (!isDragging && e.button === 0) {
          // Left-click (button 0)
          nav(`/lead/${item.id}`);
        }
      }}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-black m-1 hover:cursor-pointer rounded-2xl "
    >
      <div className="p-4 text-white">{item.name}</div>
    </button>
  );
});
