import React from "react";
import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
import { IEvent } from "@/types/event";
import Link from "next/link";

type EventItemProps = {
  event: IEvent;
};

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={event.image || "/images/event-default.png"}
          width={170}
          height={100}
          alt="Picture"
        />
      </div>
      <div className={styles.info}>
        <span>
          {event.date} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>

      <div>
        <Link className="btn" href={`/events/${event.slug}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export { EventItem };
