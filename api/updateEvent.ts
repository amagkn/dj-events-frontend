import { IEvent } from "@/types/Event";
import { API_URL } from "@/config";
import { toast } from "react-toastify";
import { EventDto } from "@/dtos/EventDto";

type UpdateEventParams = { fields: EventDto; id: string };

export const updateEvent = async ({
  fields,
  id,
}: UpdateEventParams): Promise<{ data: IEvent } | null> => {
  const res = await fetch(API_URL + `/api/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: fields }),
  });

  if (!res.ok) {
    toast.error("Something Went Wrong");
    return null;
  }

  return res.json();
};
