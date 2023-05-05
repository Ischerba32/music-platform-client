import React, { FC } from "react";
import { IAlbum } from "../types/album";
import { Card, Grid, IconButton } from "@mui/material";
import styles from "../styles/TrackItem.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { Delete } from "@mui/icons-material";
import { albumsStore } from "../store/store";

interface AlbumItemProps {
  album: IAlbum;
}

const AlbumItem: FC<AlbumItemProps> = ({ album }) => {
  const router = useRouter();

  const handleDeleteAlbum = async (e) => {
    e.stopPropagation();
    await albumsStore.removeAlbum(album._id);
  }

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/albums/" + album._id)}
    >
      <Image
        width={70}
        height={70}
        src={"http://localhost:5000/" + album.picture}
        alt={album.name}
      />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{album.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{album.artist}</div>
      </Grid>
      <IconButton
        onClick={handleDeleteAlbum}
        style={{ marginLeft: "auto" }}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default AlbumItem;
