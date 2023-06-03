import { EventAttributes } from "@/types/Event";

export type EventDto = Omit<EventAttributes, "image" | "slug">;