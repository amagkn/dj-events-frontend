import type { NextApiRequest, NextApiResponse } from "next";
import data from "@/pages/api/events/data.json";
import { IEvent } from "@/types/event";
import { IError } from "@/types/error";

export type GetEventResponse = IEvent[];

export default function getEvent(
  req: NextApiRequest,
  res: NextApiResponse<GetEventResponse | IError>
) {
  if (req.method === "GET") {
    const event = data.events.filter((e) => e.slug === req.query.slug);

    res.status(200).json(event);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
