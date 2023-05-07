import React from 'react'
import { usersStore } from '../store/store';
import styles from '../styles/TrackItem.module.scss'
import { Box, Card, Grid, Icon, IconButton } from '@mui/material';
import { Delete, Person } from '@mui/icons-material';
import { observer } from 'mobx-react';


const UserItem = ({user}) => {

  const handleDeleteUser = async (e) => {
    e.stopPropagation();
    await usersStore.removeUser(user._id);
  }

  return (
    <Card className={styles.track}>
      {/* <Image
        width={70}
        height={70}
        src={"http://localhost:5000/" + playlist.picture}
        alt={playlist.name}
      /> */}
      <Box width={70} height={70}>
        <Person />
      </Box>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{user.username} - {user.email}</div>
        {/* <div style={{fontSize: 12, color: 'gray'}}>{album.artist}</div> */}
      </Grid>
      <IconButton onClick={handleDeleteUser} style={{ marginLeft: "auto" }}>
        <Delete />
      </IconButton>
    </Card>
  )
}

export default observer(UserItem)