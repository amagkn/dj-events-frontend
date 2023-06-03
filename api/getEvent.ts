import { API_URL } from "@/config";
import { IEvent } from "@/types/Event";

type GetEventParams = {
  id: string;
};

export const getEvent = async ({
  id,
}: GetEventParams): Promise<{ data: IEvent }> => {
  const res = await fetch(API_URL + `/api/events/${id}?populate=*`);

  return res.json();
};
