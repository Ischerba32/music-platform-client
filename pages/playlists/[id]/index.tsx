import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@mui/material";
import TrackList from "../../../components/TrackList";
import { observer } from "mobx-react";
import { playlistsStore } from "../../../store/store";
import { IPlaylist } from "../../../types/playlist";

const PlaylistPage = ({ serverPlaylist }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist>(serverPlaylist);
  const router = useRouter();
  // console.log(serverPlaylist);

  // useLayoutEffect(() => {
  //   playlistsStore.currentPlaylist = serverPlaylist;
  // }, []);

  const handleDeleteTrackFromPlaylist = async (trackId: string) => {
    await playlistsStore.removeTrackFromPlaylist(currentPlaylist._id, trackId);
    setCurrentPlaylist({
      ...currentPlaylist,
      tracks: currentPlaylist.tracks.filter(track => track._id !== trackId)
    })
  };

  return (
    <MainLayout
      title={`${serverPlaylist.owner.username} - ${serverPlaylist.name}`}
    >
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>
                {serverPlaylist.owner.username}: {serverPlaylist.name}
              </h1>
              <Button
                onClick={() =>
                  router.push(`/playlists/${serverPlaylist._id}/tracks/add`)
                }
              >
                Добавить треки
              </Button>
            </Grid>
          </Box>
          <TrackList
            tracks={currentPlaylist.tracks}
            onDelete={handleDeleteTrackFromPlaylist}
          />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default observer(PlaylistPage);

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const token = req.cookies["token"];
  const response = await axios.get(
    "http://localhost:5000/playlists/" + params.id,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return {
    props: {
      serverPlaylist: response.data,
    },
  };
};
