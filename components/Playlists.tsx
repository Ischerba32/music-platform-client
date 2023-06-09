import React, { ChangeEvent, useState } from 'react'
import { Grid, Box, Typography, TextField } from '@mui/material'
import PlaylistItem from './PlaylistItem'
import { observer } from 'mobx-react'
import { playlistsStore } from '../store/store'


const Playlists = ({ playlists }) => {
  const [query, setQuery] = useState("");

  const searchPlaylists = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    await playlistsStore.searchPlaylists(query);
  }

  return (
    <Grid container direction="column">
      <Box p={2}>
        <TextField
          fullWidth
          placeholder="Search playlists"
          value={query}
          onChange={searchPlaylists}
        />
      </Box>
      <Box p={2}>
        {!playlistsStore.playlists.length && (
          <Typography variant='h5' align='center'>No playlists</Typography>
        )}
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