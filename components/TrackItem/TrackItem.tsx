import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { ITrack } from '../../types/track'
import styles from './TrackItem.module.scss';

export interface ITrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem = ({ track, active = false}: ITrackItemProps): JSX.Element => {
  const router = useRouter();

  return (
    <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
      <IconButton onClick={e => e.stopPropagation()} >
        {active
        ? <Pause />
        : <PlayArrow/>
        }
      </IconButton>
      <Image src={track.picture} width={70} height={70} alt={`${track.name} pic`} />
      <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
        <div>{track.name}</div>
        <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
      </Grid>
      {active && <div>02:40 / 03:22</div>}
      <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
        <Delete />
      </IconButton>
    </Card>
  )
}

export default TrackItem