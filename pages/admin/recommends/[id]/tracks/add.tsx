import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../../../../layouts/MainLayout'
import { Box, Button, Card, Grid } from '@mui/material'
import { AddTracksToPlaylistStore } from '../../../../../store/store'
import { GetServerSideProps } from 'next'
import $api from '../../../../../config/axios'
import { useRouter } from 'next/router'

const notInRecommendTracks = new AddTracksToPlaylistStore();

const Add = ({recommendId}) => {
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
              <h1>Добавить треки</h1>
              <h4>added: {addedCount}</h4>
            </Grid>
          </Box>
          {notInRecommendTracks.tracks.map((track) => (
            <div key={track._id}>
              <span>{track.artist} - {track.name}</span>
              <button onClick={() => handleAddTrackButton(track._id)}>+</button>
            </div>
          ))}
          {/* <TrackList tracks={tracksStore.musicTracks} /> */}
        </Card>
        <Button onClick={() => router.push(`/admin/recommends/${recommendId}`)}>Done</Button>
      </Grid>
    </MainLayout>
  )
}

export default observer(Add)

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  return {
    props: {
        recommendId: params.id
    }
  }
}