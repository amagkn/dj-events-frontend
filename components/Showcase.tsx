import React from "react";
import styles from "@/styles/Showcase.module.css";

type ShowcaseProps = {};

const Showcase: React.FC<ShowcaseProps> = () => {
  return (
    <div className={styles.showcase}>
      <h1>Welcome To The Party!</h1>
      <h2>Find the hottest DJ events</h2>
    </div>
  );
};

export { Showcase };
