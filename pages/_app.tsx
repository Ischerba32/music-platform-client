import React, { FC } from "react";
import { AppProps } from "next/app";
import { wrapper } from "../store";
import { StoreContext } from "../context/storeContext";
import { userStore, playerStore, tracksStore, albumsStore, playlistsStore } from "../store/store";
import { Provider } from "mobx-react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider
    userStore={userStore}
    playerStore={playerStore}
    tracksStore={tracksStore}
    albumsStore={albumsStore}
    playlistsStore={playlistsStore}
  >
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
);

export default WrappedApp;
