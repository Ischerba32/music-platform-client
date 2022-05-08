import { Box, Grid } from '@mui/material';
import React from 'react'
import { ITrack } from '../../types/track'
import TrackItem from '../TrackItem/TrackItem';

export interface ITrackListProps {
  tracks: ITrack[];

}

const TrackList = ({tracks}: ITrackListProps): JSX.Element => {
  return (
    <Grid container direction='column'>
      <Box p={2}>
        {tracks && tracks.map(track => (
          <TrackItem
            key={track._id}
            track={track}
          />
        ))}
      </Box>
    </Grid>
  )
}

export default TrackList