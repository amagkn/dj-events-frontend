import { Layout } from "@/components/Layout";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { API_URL } from "@/config";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { IEvent } from "@/types/Event";
import { GetEventsResponse } from "@/types/GetEventsResponse";
import { urlQueryToSearchParams } from "next/dist/shared/lib/router/utils/querystring";

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
          {new Date(event.attributes.date).toLocaleDateString("en-US")} ad{" "}
          {event.attributes.time}
        </span>

        <h1>{event.attributes.name}</h1>

        {event.attributes.image && (
          <div className={styles.image}>
            <Image
              src={event.attributes.image.data.attributes.formats.medium.url}
              alt={"Pic"}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{event.attributes.description}</p>
        <h3>Venue: {event.attributes.venue}</h3>
        <p>{event.attributes.address}</p>

        <Link className={styles.back} href="/events">
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = urlQueryToSearchParams({
    populate: "*",
    sort: "date",
  });

  const res = await fetch(API_URL + `/api/events?${query}`);

  const events: GetEventsResponse = await res.json();

  const paths = events.data.map((e) => ({
    params: { slug: e.attributes.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const query = urlQueryToSearchParams({
    populate: "*",
    "filters[slug][$eq]": params!.slug,
  });

  const res = await fetch(API_URL + `/api/events?${query}`);
  const {
    data: [event],
  }: GetEventsResponse = await res.json();

  return { props: { event }, revalidate: 1 };
};
