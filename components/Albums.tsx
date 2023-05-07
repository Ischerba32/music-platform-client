import { FC } from "react";
import { IAlbum } from "../types/album";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Box, Grid } from "@mui/material";
import AlbumItem from "./AlbumItem";
import { observer } from "mobx-react";
import { albumsStore } from "../store/store";

const Albums = () => {
  // const { active } = useTypedSelector((state) => state.player);
  return (
    <Grid container direction="column">
      <Box p={2}>
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