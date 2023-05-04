import React from 'react'
import { Grid, Box } from '@mui/material'
import PlaylistItem from './PlaylistItem'
import { observer } from 'mobx-react'
import { playlistsStore } from '../store/store'


const Playlists = ({ playlists }) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {playlistsStore.playlists.map((playlist) => (
          <PlaylistItem
            key={playlist._id}
            playlist={playlist}
          />
        ))}
      </Box>
    </Grid>
  )
}

export default observer(Playlists)