import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../../../layouts/MainLayout'
import { Box, Button, Card, Grid } from '@mui/material'
import { AddTracksToPlaylistStore } from '../../../../store/store'
import { GetServerSideProps } from 'next'
import $api from '../../../../config/axios'
import { useRouter } from 'next/router'

const notInPlaylistTracks = new AddTracksToPlaylistStore();

const Add = ({playlistId}) => {
  const [addedCount, setAddedCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    notInPlaylistTracks.getUnaddedTracks(playlistId, "playlist");
  }, [playlistId, addedCount])

  console.log(playlistId);

  const handleAddTrackButton = async (trackId: string) => {
    await $api.post('/playlists/track', {
      playlistId,
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
          {notInPlaylistTracks.tracks.map((track) => (
            <div key={track._id}>
              <span>{track.artist.username} - {track.name}</span>
              <button onClick={() => handleAddTrackButton(track._id)}>+</button>
            </div>
          ))}
          {/* <TrackList tracks={tracksStore.musicTracks} /> */}
        </Card>
        <Button onClick={() => router.push(`/playlists/${playlistId}`)}>Done</Button>
      </Grid>
    </MainLayout>
  )
}

export default observer(Add)

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  return {
    props: {
        playlistId: params.id
    }
  }
}