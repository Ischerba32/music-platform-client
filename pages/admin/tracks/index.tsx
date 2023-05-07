import React, { useContext, useEffect } from "react";
import MainLayout from "../../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { ITrack } from "../../../types/track";
import TrackList from "../../../components/TrackList";
import Player from "../../../components/Player";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { NextThunkDispatch, wrapper } from "../../../store";
import { fetchTracks } from "../../../store/actions-creators/track";
import { tracksStore, userStore } from "../../../store/store";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../../context/storeContext";
import { toJS } from "mobx";
import axios from "axios";
import { GetServerSideProps } from "next";
import Error from "next/error";

const Index = ({ tracks, errorStatus }) => {
  const router = useRouter();
  // const { tracks: Storedtracks, error } = useTypedSelector((state) => state.track);

  // const { tracksStore } = useContext(StoreContext);

  console.log(toJS(tracksStore.tracks));

  // console.log('tracks: ', tracks);

  useEffect(() => {
    tracksStore.tracks = tracks;
  }, [tracks])

  if (errorStatus) {
    return (
      <Error statusCode={errorStatus} title="You have no permission on this page" />
    );
  }

  const handleDeleteTrack = async (trackId: string) => {
    await tracksStore.removeTrack(trackId);
  }

  return (
    <MainLayout title={"Список треков - музыкальная площадка"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push("/admin/tracks/create")}>
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TrackList
            tracks={tracksStore.musicTracks}
            onDelete={handleDeleteTrack}
          />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default observer(Index);

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const dispatch = store.dispatch as NextThunkDispatch;
//     // await dispatch(await fetchTracks());
//     const tracks = await tracksStore.fetchTracks();

//     return {
//       props: {
//         tracks
//       },
//     };
//   }
// );


// export const getServerSideProps = async ({ req }) => {
//   // const tracks = await tracksStore.fetchTracks();
//   console.log(req.cookie);
//   // const result = JSON.parse(JSON.stringify(tracks));
//   return {
//     props: {},
//   }
// }

export const getServerSideProps: GetServerSideProps = async ({params, req}) => {
  const token = req.cookies['token'];
  try {
    const response = await axios.get('http://localhost:5000/tracks', {
      headers: {
          'authorization': `Bearer ${token}`
      },
      withCredentials: true
      })
    return {
      props: {
        tracks: response.data,
      }
    }
  } catch (error) {
    return {
      props: {
          errorStatus: error.response.status
      }
    }
  }
}