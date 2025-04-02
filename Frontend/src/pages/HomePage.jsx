import { useGetLeads, useUpdateLead } from "@/api/Data";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "@/components/Droppable";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const nav = useNavigate();
  const { data, isPending } = useGetLeads();
  const {
    UpeateLead,
    isError: isErrorUpdate,
    isPending: isPendingUpdate,
  } = useUpdateLead();
  if (isPending) {
    return <p>loading</p>;
  }
  const newLeads = data.filter((item) => item.status === "new");
  const inProgressLeads = data.filter((item) => item.status === "in_progress");
  const completedLeads = data.filter((item) => item.status === "completed");
  function handleDragEnd({ over, active }) {
    if (!over) return;
    console.log("over", over);
    console.log("active", active);
    console.log(data);
    const item = data.find((item) => item.id === parseInt(active.id));
    console.log("item", item);
    if (over.id === item.status) {
      return;
    } else {
      UpeateLead({ jsonData: { ...item, status: over.id }, id: item.id });
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col min-h-screen justify-center">
        <div className="flex items-center px-12 ">
          <Droppable id="new" text={"New Leads"} data={newLeads} />
          <Droppable
            id="in_progress"
            text={"In Progress"}
            data={inProgressLeads}
          />
          <Droppable id="completed" text={"Completed"} data={completedLeads} />
        </div>
        <Button
          className="mx-auto mt-2 hover:cursor-pointer"
          onClick={() => nav("/lead")}
        >
          Add New Lead
        </Button>
      </div>
    </DndContext>
  );
};

export default HomePage;
