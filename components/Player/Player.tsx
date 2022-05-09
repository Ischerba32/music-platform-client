import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import { ChangeEvent, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setVolume } from '../../store/action-creators/player';
import { ITrack } from '../../types/track';
import TrackProgress from '../TrackProgress/TrackProgress';
import styles from './Player.module.scss';

let audio;

const Player = () => {
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

  const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player);
  const { pauseTrack, playTrack, setVolume, setDuration, setCurrentTime, setActiveTrack } = useActions()

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  }

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      }
    }
  }


  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));

  }

  const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));

  }

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={play} >
        {!pause
        ? <Pause />
        : <PlayArrow />
        }
      </IconButton>
      <Grid
        container
        direction='column'
        style={{width: 200, margin: '0 20px'}}
      >
        <div>{active?.name}</div>
        <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{marginLeft: 'auto'}}/>
      <TrackProgress
        left={volume}
        right={100}
        onChange={changeVolume}
      />
    </div>
  )
}

export default Player