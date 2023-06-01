import type { NextApiRequest, NextApiResponse } from "next";
import data from "@/pages/api/events/data.json";
import { IEvent } from "@/types/event";
import { IError } from "@/types/error";

export type GetEventsResponse = {
  events: IEvent[];
};

export default function getEvents(
  req: NextApiRequest,
  res: NextApiResponse<GetEventsResponse | IError>
) {
  if (req.method === "GET") {
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
