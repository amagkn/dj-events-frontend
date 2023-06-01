import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { GetEventsResponse } from "@/pages/api/events";
import { IEvent } from "@/types/event";
import { EventItem } from "@/components/EventItem";

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
  const res = await fetch(API_URL + `/api/events`);

  const events: GetEventsResponse = await res.json();

  return { props: { events: events.events }, revalidate: 1 };
};
