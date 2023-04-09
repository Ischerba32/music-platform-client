import { FC } from "react";
import { IAlbum } from "../types/album";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Box, Grid } from "@mui/material";
import AlbumItem from "./AlbumItem";


interface AlbumsProps {
  albums: IAlbum[];
}

const Albums: FC<AlbumsProps> = ({albums}) => {
  const { active } = useTypedSelector((state) => state.player);
  return (
    <Grid container direction="column">
      <Box p={2}>
        {albums.map((album) => (
          <AlbumItem
            key={album._id}
            album={album}
          />
        ))}
      </Box>
    </Grid>
  )
}

export default Albums