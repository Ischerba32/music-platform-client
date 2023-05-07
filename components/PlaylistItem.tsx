import React from 'react'
import { Delete } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/TrackItem.module.scss'
import { playlistsStore } from '../store/store';
import { observer } from 'mobx-react';

const PlaylistItem = ({ playlist }) => {
  const router = useRouter();
  const handleClickPlaylist = () => {
    // playlistsStore.currentPlaylist = playlist;
    router.push('/playlists/' + playlist._id)
  }

  const handleDeletePlaylist = async (e) => {
    e.stopPropagation();
    await playlistsStore.removePlaylist(playlist._id);
  }

  return (
    <Card className={styles.track} onClick={handleClickPlaylist}>
      <Image
        width={70}
        height={70}
        src={"http://localhost:5000/" + playlist.picture}
        alt={playlist.name}
      />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{playlist.name}</div>
        {/* <div style={{fontSize: 12, color: 'gray'}}>{album.artist}</div> */}
      </Grid>
      <IconButton onClick={handleDeletePlaylist} style={{ marginLeft: "auto" }}>
        <Delete />
      </IconButton>
    </Card>
  );
}

export default observer(PlaylistItem)