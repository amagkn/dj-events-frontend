import React from "react";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { Search } from "@/components/Search";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ Events</Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/events/add">Add Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
