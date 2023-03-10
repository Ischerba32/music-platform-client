import { Container } from "@mui/material";
import Head from "next/head";
import { FC, ReactNode } from "react"
import Navbar from "../components/Navbar/Navbar"
import Player from "../components/Player/Player";
import { AudioContext } from "../context/audioContext";

export interface IMainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

let audio;

const MainLayout = ({children, title, description, keywords}: IMainLayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title || 'Placify'}</title>
        <meta name="description" content={`Placify. Like a Spotify, But a Placify. ${description}`} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || 'Spotify, music, artists, Apple music'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AudioContext.Provider value={audio}>
      <Navbar />
        <Container
          style={
            {margin: '90px 0'}
          }
          >
          {children}
        </Container>
        <Player />
      </AudioContext.Provider>
    </>
  )
}

export default MainLayout