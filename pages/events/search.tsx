import { Layout } from "@/components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { EventItem } from "@/components/EventItem";
import { IEvent } from "@/types/Event";
import { getAllEvents } from "@/api/getAllEvents";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  events: IEvent[];
};

export default function SearchPage({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for "{router.query.term}"</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const events = await getAllEvents({ searchString: query.term as string });

  return { props: { events: events.data } };
};
