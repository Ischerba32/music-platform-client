import { Grid, Box } from '@mui/material'
import React from 'react'
import { usersStore } from '../store/store'
import { observer } from 'mobx-react'
import UserItem from './UserItem'

const Users = () => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {usersStore.users.map((user) => (
          // <TrackItem
          //   key={track._id}
          //   track={track}
          //   active={playerStore.active?._id === track._id}
          //   onDelete={onDelete}
          // />
          <UserItem key={user._id} user={user} />
        ))}
      </Box>
    </Grid>
  )
}

export default observer(Users)