import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import { ITrack } from '../../types/track';
import TrackProgress from '../TrackProgress/TrackProgress';
import styles from './Player.module.scss';

const Player = () => {
  const active = false;
  const track:  ITrack = {
    _id: '1',
    name: 'Demo 1',
    artist: 'John Doe',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium quo est iure quibusdam id explicabo autem voluptas illo dolorem, obcaecati quia porro architecto numquam aliquid cumque eum commodi totam maxime.',
    listens: 5,
    audio: 'http://localhost:5000/audio/5544b27a-6e66-45e8-a1f8-a28a50ca989d.mp3',
    picture: 'http://localhost:5000/image/c3ae983d-98d7-4d0f-a7b4-3a770975e92a.jpg',
    comments: []
  }
  return (
    <div className={styles.player}>
      <IconButton onClick={e => e.stopPropagation()} >
        {active
        ? <Pause />
        : <PlayArrow />
        }
      </IconButton>
      <Grid
        container
        direction='column'
        style={{width: 200, margin: '0 20px'}}
      >
        <div>{track.name}</div>
        <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
      </Grid>
      <TrackProgress
        left={0}
        right={100}
        onChange={(e) => ({})}
      />
      <VolumeUp style={{marginLeft: 'auto'}}/>
      <TrackProgress
        left={0}
        right={100}
        onChange={(e) => ({})}
      />
    </div>
  )
}

export default Player