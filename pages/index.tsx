import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { EventItem } from "@/components/EventItem";
import Link from "next/link";
import { IEvent } from "@/types/Event";
import { GetEventsResponse } from "@/types/GetEventsResponse";
import { urlQueryToSearchParams } from "next/dist/shared/lib/router/utils/querystring";

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
  const query = urlQueryToSearchParams({
    populate: "*",
    sort: "date",
    "pagination[limit]": "3",
  });

  const res = await fetch(API_URL + `/api/events?${query}`);

  const events: GetEventsResponse = await res.json();

  return { props: { events: events.data }, revalidate: 1 };
};
