import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { playlistsStore, userStore } from "../../store/store";
import { useRouter } from "next/router";
import { Grid, Card, Box, Button } from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import Playlists from "../../components/Playlists";
import { observer } from "mobx-react";
import Error from "next/error";

const PlaylistsPage = ({ playlists, errorStatus }) => {
  console.log(playlists);
  const router = useRouter();

  useEffect(() => {
    playlistsStore.playlists = playlists;
   }, [playlists])

  // useEffect(() => {
  //   userStore.checkAuth().then(response => !response && router.push('/signIn'));
  // }, [router])

  if (errorStatus) {
    return (
      <Error statusCode={errorStatus} title="You have no permission on this page" />
    );
  }

  return (
    <MainLayout title={"Список плейлистов - музыкальная площадка"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Playlists</h1>
              <Button onClick={() => router.push("/playlists/create")}>
                Создать
              </Button>
            </Grid>
          </Box>
          <Playlists playlists={playlists} />
          {/* <Albums albums={albums} /> */}
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default observer(PlaylistsPage);

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const token = req.cookies["token"];
  try {
    const response = await axios.get("http://localhost:5000/playlists", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return {
      props: {
        playlists: response.data,
      },
    };
  } catch(error) {
    return {
      props: {
        errorStatus: error.response.status,
      }
    }
  }
};