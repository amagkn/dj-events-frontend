import { IEvent } from "@/types/Event";
import { API_URL } from "@/config";
import { toast } from "react-toastify";
import { EventDto } from "@/dtos/EventDto";

type AddEventParams = { fields: EventDto };

export const addEvent = async ({
  fields,
}: AddEventParams): Promise<IEvent | null> => {
  const res = await fetch(API_URL + "/api/events", {
    method: "POST",
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
