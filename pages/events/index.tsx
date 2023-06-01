import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { EventItem } from "@/components/EventItem";
import { IEvent } from "@/types/Event";
import { GetEventsResponse } from "@/types/GetEventsResponse";
import { urlQueryToSearchParams } from "next/dist/shared/lib/router/utils/querystring";

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
  const query = urlQueryToSearchParams({
    populate: "*",
    sort: "date",
  });

  const res = await fetch(API_URL + `/api/events?${query}`);

  const events: GetEventsResponse = await res.json();

  return { props: { events: events.data }, revalidate: 1 };
};
