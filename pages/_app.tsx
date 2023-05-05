import React, { FC } from "react";
import { AppProps } from "next/app";
import { wrapper } from "../store";
import { StoreContext } from "../context/storeContext";
import { userStore, playerStore, tracksStore, albumsStore, playlistsStore } from "../store/store";
import { Provider } from "mobx-react";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider
    userStore={userStore}
    playerStore={playerStore}
    tracksStore={tracksStore}
    albumsStore={albumsStore}
    playlistsStore={playlistsStore}
  >
    <Component {...pageProps} />
  </Provider>
);

export default WrappedApp;
