import { Layout } from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { IEvent } from "@/types/Event";
import { getEvent } from "@/api/getEvent";
import { EventDto } from "@/dtos/EventDto";
import { updateEvent } from "@/api/updateEvent";
import Image from "next/image";
import { FaImage } from "react-icons/fa";

type Props = {
  event: IEvent;
};

export default function EditEventPage({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [fields, setFields] = useState<EventDto>({
    name: event.attributes.name,
    venue: event.attributes.venue,
    address: event.attributes.address,
    performers: event.attributes.performers,
    date: event.attributes.date,
    time: event.attributes.time,
    description: event.attributes.description,
  });

  const [imgPreview, setImgPreview] = useState(
    event.attributes.image.data
      ? event.attributes.image.data.attributes.formats.thumbnail.url
      : null
  );
  const router = useRouter();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(fields).some((val) => !Boolean(val));

    if (hasEmptyFields) {
      toast.error("Please fill in all fields!");
      return;
    }

    const res = await updateEvent({ fields, id: event.id });
    console.log(res);
    if (res) {
      router.push(`/events/${res.data.attributes.slug}`);
    }
  };
  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;

    setFields((curr) => ({ ...curr, [name]: value }));
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit event</h1>
      <ToastContainer />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={fields.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={fields.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={fields.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={fields.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={fields.date.split("T")[0]}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={fields.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            value={fields.description}
            onChange={handleInputChange}
          />
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>

      {imgPreview ? (
        <Image src={imgPreview} height={100} width={170} alt="Pic" />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const eventId = params!.id as string;

  const event = await getEvent({ id: eventId });

  return { props: { event: event.data } };
};
