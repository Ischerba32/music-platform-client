import { Box, Grid } from '@mui/material'
import { observer } from 'mobx-react'
import React from 'react'
import { recommendsStore } from '../store/store'
import RecommendItem from './RecommendItem'

const Recommends = () => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {recommendsStore.recommends.map((recommend) => (
          <RecommendItem
            key={recommend._id}
            recommend={recommend}
          />
        ))}
      </Box>
    </Grid>
  )
}

export default observer(Recommends)