import { Box, Grid, TextField, Typography } from "@mui/material";
import AlbumItem from "./AlbumItem";
import { observer } from "mobx-react";
import { albumsStore, userStore } from "../store/store";
import { ChangeEvent, useState } from "react";

const Albums = () => {
  const [query, setQuery] = useState("");

  const searchAlbums = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    await albumsStore.searchAlbums(query);

  }

  return (
    <Grid container direction="column">
      {userStore.userRole !== "artist" && (
        <Box p={2}>
          <TextField
            fullWidth
            placeholder="Search albums"
            value={query}
            onChange={searchAlbums}
          />
        </Box>
      )}
      <Box p={2}>
      {!albumsStore.albums.length && (
          <Typography variant='h5' align='center'>No albums</Typography>
        )}
        {albumsStore.albums.map((album) => (
          <AlbumItem
            key={album._id}
            album={album}
          />
        ))}
      </Box>
    </Grid>
  )
}

export default observer(Albums)