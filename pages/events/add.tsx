import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { addEvent, AddEventDto } from "@/api/addEvent";

export default function AddEventPage() {
  const [fields, setFields] = useState<AddEventDto>({
    name: "",
    venue: "",
    address: "",
    performers: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(fields).some((val) => !Boolean(val));

    if (hasEmptyFields) {
      toast.error("Please fill in all fields!");
      return;
    }

    const res = await addEvent({ fields });

    if (res) {
      router.push(`/events/${res.attributes.slug}`);
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
      <h1>Add event</h1>
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
              value={fields.date}
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

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}
