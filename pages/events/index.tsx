import { Layout } from "@/components/Layout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { EventItem } from "@/components/EventItem";
import { IEvent } from "@/types/Event";
import { getAllEvents } from "@/api/getAllEvents";

type Props = {
  events: IEvent[];
};

export default function EventsPage({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = await getAllEvents({});

  return { props: { events: events.data }, revalidate: 1 };
};
