import type { NextApiRequest, NextApiResponse } from "next";
import data from "@/pages/api/events/data.json";

type Data = any[];

type Error = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "GET") {
    const event = data.events.filter((e) => e.slug === req.query.slug);

    res.status(200).json(event);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
