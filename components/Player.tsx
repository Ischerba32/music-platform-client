import React, {useEffect} from 'react';
import clsx from 'clsx';
// import {Pause, PlayArrow, VolumeUp} from "@material-ui/icons";
// import {Button, Grid, IconButton} from "@material-ui/core";
import styles from '../styles/Player.module.scss'
import TrackProgress from "./TrackProgress";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import TrackVolume from './TrackVolume';
import { Button, Grid, IconButton } from '@mui/material';
import { Pause, PlayArrow, VolumeUp, ExpandMore, ExpandLess } from '@mui/icons-material';
import { playerStore, tracksStore } from '../store/store';
import { observer } from 'mobx-react-lite';
// import RevealIcon from '@material-ui/icons/ArrowDropUp';
// import CollapseIcon from '@material-ui/icons/ArrowDropDown';

let audio;

const Player = () => {
    // const {pause, volume, active, currentTime, collapsed} = useTypedSelector(state => state.player)
    // const {tracks} = useTypedSelector(state => state.track)
    // const {pauseTrack, playTrack, setVolume, setCurrentTime, setActiveTrack, setCollapsed} = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
        }
    }, [playerStore.active])

    useEffect(() => {
        if (playerStore.pause) {
            audio.pause()
        } else {
            audio.play()
        }
    }, [playerStore.active, playerStore.pause]);

    const setAudio = () => {
        if (playerStore.active) {
            audio.pause()
            audio.src = 'http://localhost:5000/' + playerStore.active.audio
            audio.volume = playerStore.volume / 100
            audio.currentTime = playerStore.currentTime
            audio.ontimeupdate = () => {
                // setCurrentTime(Math.ceil(audio.currentTime))
                playerStore.currentTime = Math.ceil(audio.currentTime);
            }
            audio.onended = () => {
                let nextTrackIndex = tracksStore.tracks.indexOf(playerStore.active) + 1

                nextTrackIndex = tracksStore.tracks[nextTrackIndex] ? nextTrackIndex : 0

                // setActiveTrack(tracks[nextTrackIndex])
                playerStore.active = tracksStore.tracks[nextTrackIndex];
            }
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        // setVolume(Number(e.target.value));
        playerStore.volume = Number(e.target.value)
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        // setCurrentTime(Number(e.target.value))
        playerStore.currentTime = Number(e.target.value);
    }

    return (
        <div className={clsx({[styles.player]: true, [styles.player_collapsed]: playerStore.collapsed})}>
            <Button
                className={styles['collapse-btn']}
                variant="contained"
                onClick={() => playerStore.collapsed = !playerStore.collapsed}
            >
                {playerStore.collapsed
                    ? <ExpandLess />
                    : <ExpandMore />
                }
            </Button>

            <IconButton onClick={() => playerStore.pause ? playerStore.play() : playerStore.pause = true}>
                {playerStore.pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>

            <img className={styles['track-picture']} src={'http://localhost:5000/' + playerStore.active?.picture} />

            <Grid container direction="column" style={{width: 200, margin: '0 20px 0 10px'}}>
                <div>{playerStore.active?.name || 'track'}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{playerStore.active?.artist || 'artist'}</div>
            </Grid>
            <TrackProgress left={playerStore.currentTime} right={playerStore.active?.duration || 0} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackVolume left={playerStore.volume} right={100} onChange={changeVolume}/>
        </div>
    );
};

export default observer(Player);
