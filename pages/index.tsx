import { Layout } from "@/components/Layout";
import { API_URL } from "@/config";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { GetEventsResponse } from "@/pages/api/events";
import { IEvent } from "@/types/event";

type Props = {
  events: IEvent[];
};

export default function HomePage({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(events);

  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch(API_URL + `/api/events`);

  const events: GetEventsResponse = await res.json();

  return { props: { events: events.events }, revalidate: 1 };
};
