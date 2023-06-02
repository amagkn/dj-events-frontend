import React, { FormEventHandler, useState } from "react";
import styles from "@/styles/Search.module.css";
import { useRouter } from "next/router";

type SearchProps = {};

const Search: React.FC<SearchProps> = () => {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    router.push(`/events/search?term=${term}`);

    setTerm("");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
};

export { Search };
