import { IEvent } from "@/types/Event";
import { API_URL } from "@/config";
import { toast } from "react-toastify";

type DeleteEventParams = { id: string };

export const deleteEvent = async ({
  id,
}: DeleteEventParams): Promise<IEvent | null> => {
  const res = await fetch(API_URL + `/api/events/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    toast.error("Something Went Wrong");
    return null;
  }

  return res.json();
};
