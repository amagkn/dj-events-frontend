import { Layout } from "@/components/Layout";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { API_URL } from "@/config";
import { IEvent } from "@/types/event";
import { GetEventResponse } from "@/pages/api/events/[slug]";
import { GetEventsResponse } from "@/pages/api/events";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";

type Props = {
  event: IEvent;
};

export default function EventPage({
  event,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const deleteEvent = () => {
    console.log("delete");
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <FaPencilAlt /> Edit Events
          </Link>

          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {event.date} ad {event.time}
        </span>

        <h1>{event.name}</h1>

        {event.image && (
          <div className={styles.image}>
            <Image src={event.image} alt={"Pic"} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link className={styles.back} href="/events">
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(API_URL + "/api/events/");
  const { events }: GetEventsResponse = await res.json();

  const paths = events.map((e) => ({ params: { slug: e.slug } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const res = await fetch(API_URL + "/api/events/" + params!.slug);
  const [event]: GetEventResponse = await res.json();

  return { props: { event }, revalidate: 1 };
};
