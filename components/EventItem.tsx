import React from "react";
import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
import { IEvent } from "@/types/Event";
import Link from "next/link";

type EventItemProps = {
  event: IEvent;
};

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const eventAttributes = event.attributes;
  const imageAttributes =
    event.attributes.image.data.attributes.formats.thumbnail;

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={imageAttributes.url || "/images/event-default.png"}
          width={170}
          height={100}
          alt="Picture"
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(eventAttributes.date).toLocaleDateString("en-US")} at{" "}
          {event.attributes.time}
        </span>
        <h3>{eventAttributes.name}</h3>
      </div>

      <div>
        <Link className="btn" href={`/events/${eventAttributes.slug}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export { EventItem };
