import React from "react";
import { userStore } from "../../store/store";
import MainLayout from "../../layouts/MainLayout";
import { Grid, Card, Box, Button } from "@mui/material";
import TrackList from "../../components/TrackList";
import { observer } from "mobx-react";

const FavoritesPage = () => {
  console.log(userStore.favorites);

  return (
    <MainLayout title={`Любимые треки`}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Favorite tracks</h1>
            </Grid>
          </Box>
          <TrackList
            tracks={userStore.favorites}
          />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default observer(FavoritesPage);
