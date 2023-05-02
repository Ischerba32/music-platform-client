import React, { useContext } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { ITrack } from "../../types/track";
import TrackList from "../../components/TrackList";
import Player from "../../components/Player";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks } from "../../store/actions-creators/track";
import { tracksStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../context/storeContext";
import { toJS } from "mobx";

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector((state) => state.track);

  const { tracksStore } = useContext(StoreContext);

  console.log(toJS(tracksStore.tracks));

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"Список треков - музыкальная площадка"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push("/tracks/create")}>
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default observer(Index);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
    await tracksStore.fetchTracks();

    return {
      props: {},
    };
  }
);
