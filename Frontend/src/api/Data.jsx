import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect } from "react";
const SOCKET_URL = "ws://localhost:8000/ws/";
import { queryClient } from "@/main.jsx";
export const useGetLeads = () => {
  const { lastMessage } = useWebSocket(SOCKET_URL);

  const getLeads = async () => {
    const ressponse = await fetch(`http://127.0.0.1:8000/api/VS/lead/`);
    if (!ressponse.ok) {
      throw new Error("Failed To create USER");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    data,
    isError,
    isPending,
    // error,
  } = useQuery({ queryKey: [`leads`], queryFn: getLeads });

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const messageData = JSON.parse(lastMessage.data);
        console.log("messageData", messageData.message.name);
        if (messageData.type === "NEW_LEAD") {
          console.log("objectNEW_LEAD");
          queryClient.setQueryData(["leads"], (oldData) => {
            return oldData
              ? [...oldData, messageData.message]
              : [messageData.message];
          });
        } else if (messageData.type === "Update_Lead") {
          console.log("objectUpdate_Lead");
          queryClient.setQueryData(["leads"], (oldData) => {
            // build it
            return oldData.map((lead) =>
              lead.id === messageData.message.id ? messageData.message : lead
            );
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message", error);
      }
    }
  }, [lastMessage, queryClient]);

  if (isError) {
    toast.error("there is error");
  }
  return { data, isPending };
};

export const useAddLeads = () => {
  const { sendMessage } = useWebSocket(SOCKET_URL);
  const nav = useNavigate();
  const addLeads = async (jsonData) => {
    console.log(jsonData);
    const ressponse = await fetch(`http://127.0.0.1:8000/api/VS/lead/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    if (!ressponse.ok) {
      throw new Error("Failed To create USER");
    }
    const data = await ressponse.json();
    sendMessage(JSON.stringify({ type: "NEW_LEAD", message: data }));
    return data;
  };
  const {
    mutateAsync: CreateLead,
    isError,
    isPending,
    reset,
    error,
    isSuccess,
  } = useMutation({ mutationFn: addLeads });
  if (isSuccess) {
    toast.success("Created Succefully");
    nav("/");
  }
  if (isError) {
    console.log(error);
    toast.error("there is error in useAddLeads");

    reset();
  }
  return { CreateLead, isError, isPending };
};

export const useUpdateLead = () => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL);
  const nav = useNavigate();
  const updateLead = async ({ jsonData, id }) => {
    console.log("id", id);
    console.log("jsonData", jsonData);
    const ressponse = await fetch(`http://127.0.0.1:8000/api/VS/lead/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    if (!ressponse.ok) {
      throw new Error("Failed To create USER");
    }
    const data = await ressponse.json();
    sendMessage(JSON.stringify({ type: "Update_Lead", message: data }));
    console.log("object tetet");
    return data;
  };
  const {
    mutateAsync: UpeateLead,
    isError,
    isPending,
    reset,
    isSuccess,
    error,
  } = useMutation({ mutationFn: updateLead });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated Successfully");
    }
    if (isError) {
      toast.error("There is an error in useUpdateLead");
      console.log(error);
      reset();
    }
  }, [isSuccess, isError]);
  return { UpeateLead, isError, isPending };
};

export const useGetLead = (id) => {
  const getLead = async () => {
    const ressponse = await fetch(`http://127.0.0.1:8000/api/VS/lead/${id}/`);
    if (!ressponse.ok) {
      throw new Error("Failed To create USER");
    }
    const data = await ressponse.json();
    return data;
  };
  const {
    data: lead,
    isError,
    isPending,
    // error,
  } = useQuery({ queryKey: [`leads`, id], queryFn: getLead, enabled: !!id });

  if (isError) {
    toast.error("there is error useGetLead");
  }
  return { lead, isPending };
};
