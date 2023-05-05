import React, { ReactNode, useEffect } from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { playerStore, userStore } from "../store/store";
import { observer } from "mobx-react";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  const router = useRouter();

  useEffect(() => {
    userStore
      .checkAuth()
      .then((response) => !response && router.push("/signIn"));
  }, [router]);

  return (
    <>
      <Head>
        <title>{title || "Музыкальная площадка"}</title>
        <meta
          name="description"
          content={
            `Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` +
            description
          }
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "Музыка, треки, артисты"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container style={{ margin: "90px 0" }}>{children}</Container>
      {playerStore.active && (
        <Player />
      )}
    </>
  );
};

export default observer(MainLayout);
