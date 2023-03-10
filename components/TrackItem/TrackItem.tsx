import { Info, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useContext } from 'react'
import { useActions } from '../../hooks/useActions';
import { ITrack } from '../../types/track'
import styles from './TrackItem.module.scss';
import { AudioContext } from '../../context/audioContext';
export interface ITrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem = ({ track, active = false}: ITrackItemProps): JSX.Element => {
  const router = useRouter();
  // const audio = useContext(AudioContext);
  const { playTrack, pauseTrack, setActiveTrack } = useActions()

  const play = (e: SyntheticEvent) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  }

  return (
    <Card className={styles.track} >
      <IconButton onClick={play} >
        {active
        ? <Pause />
        : <PlayArrow/>
        }
      </IconButton>
      <Image src={'http://localhost:5000/'+ track.picture} width={70} height={70} alt={`${track.name} pic`} />
      <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
        <div>{track.name}</div>
        <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
      </Grid>
      {active && <div>02:40 / 03:22</div>}
      <IconButton onClick={() => router.push('/tracks/' + track._id)} style={{marginLeft: 'auto'}}>
        <Info />
      </IconButton>
    </Card>
  )
}

export default TrackItem