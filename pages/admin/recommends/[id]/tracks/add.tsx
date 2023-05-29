import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../../../../layouts/MainLayout'
import { Box, Button, Card, Grid, IconButton } from '@mui/material'
import { AddTracksToPlaylistStore } from '../../../../../store/store'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import $api from '../../../../../config/axios'
import { useRouter } from 'next/router'
import { Add } from '@mui/icons-material'

const notInRecommendTracks = new AddTracksToPlaylistStore();

const AddPage = ({recommendId}) => {
  const [addedCount, setAddedCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    notInRecommendTracks.getUnaddedTracks(recommendId, "recommend");
  }, [recommendId, addedCount])

  console.log(recommendId);

  const handleAddTrackButton = async (trackId: string) => {
    await $api.post('/recommends/track', {
      recommendId,
      trackId,
    })
    setAddedCount((prev) => prev + 1);
  }

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Add</h1>
              <h4>added: {addedCount}</h4>
            </Grid>
          </Box>
          {notInRecommendTracks.tracks.map((track) => (
            <Box key={track._id} p={1}>
              <Card  style={{display: "flex", alignItems: "center"}}>
                <Image
                  width={70}
                  height={70}
                  src={"http://localhost:5000/" + track.picture}
                  alt="track"
                />
                <Grid
                  container
                  direction="column"
                  style={{ width: 200, margin: "0 20px" }}
                >
                  <div>{track.name}</div>
                  <div style={{ fontSize: 12, color: "gray" }}>{track.artist?.username}</div>
                </Grid>
                  <IconButton
                    onClick={() => handleAddTrackButton(track._id)}
                    style={{ marginLeft: "auto" }}
                  >
                    <Add />
                  </IconButton>
              </Card>
            </Box>
          ))}
          {/* <TrackList tracks={tracksStore.musicTracks} /> */}
        </Card>
        <Button onClick={() => router.push(`/recommends/${recommendId}`)}>Done</Button>
      </Grid>
    </MainLayout>
  )
}

export default observer(AddPage)

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  return {
    props: {
        recommendId: params.id
    }
  }
}