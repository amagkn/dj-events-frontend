import React from "react";
import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type LayoutProps = {
  title?: string;
  keywords?: string;
  description?: string;
};

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  description = "Find the latest DJ and other musical events",
  title = "DJ Events | Find the hottest parties",
  keywords = "music, dj, edm, events",
  children,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export { Layout };
