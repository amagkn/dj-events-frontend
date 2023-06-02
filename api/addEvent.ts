import { EventAttributes, IEvent } from "@/types/Event";
import { API_URL } from "@/config";
import { toast } from "react-toastify";

export type AddEventDto = Omit<EventAttributes, "image" | "slug">;

type AddEventParams = { fields: AddEventDto };

export const addEvent = async ({ fields }: AddEventParams) => {
  const res = await fetch(API_URL + "/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: fields }),
  });

  if (!res.ok) {
    toast.error("Something Went Wrong");
    return;
  }

  const event: IEvent = await res.json();

  return event;
};
