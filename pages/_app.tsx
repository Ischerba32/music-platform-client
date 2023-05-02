import React, { FC } from "react";
import { AppProps } from "next/app";
import { wrapper } from "../store";
import { StoreContext } from "../context/storeContext";
import { userStore, playerStore, tracksStore } from "../store/store";
import { Provider,  } from 'mobx-react';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Provider userStore={userStore} playerStore={playerStore} tracksStore={tracksStore}>
    <Component {...pageProps} />
  </Provider>
);

export default wrapper.withRedux(WrappedApp);
