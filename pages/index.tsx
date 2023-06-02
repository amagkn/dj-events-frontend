import { Layout } from "@/components/Layout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { EventItem } from "@/components/EventItem";
import Link from "next/link";
import { IEvent } from "@/types/Event";
import { getAllEvents } from "@/api/getAllEvents";

type Props = {
  events: IEvent[];
};

export default function HomePage({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      {events.length > 0 && (
        <Link className="btn-secondary" href="/events">
          View All Events
        </Link>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = await getAllEvents({ limit: "3" });

  return { props: { events: events.data }, revalidate: 1 };
};
