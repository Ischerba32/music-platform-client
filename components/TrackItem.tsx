import React from "react";
import { ITrack } from "../types/track";
// import {Card, Grid, IconButton} from "@material-ui/core";
import styles from "../styles/TrackItem.module.scss";
// import {Delete, Pause, PlayArrow} from "@material-ui/icons";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import formatTrackTime from "../utils/formatTime";
import { Card, Grid, IconButton } from "@mui/material";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { playerStore } from "../store/store";
import Image from "next/image";
import { observer } from "mobx-react";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  // const {playTrack, pauseTrack, setActiveTrack} = useActions()
  // const { currentTime, pause } = useTypedSelector(state => state.player)

  const play = (e, trackId) => {
    e.stopPropagation();

    if (!playerStore.active) {
      playerStore.active = track;
      playerStore.play();
    }
    else if (playerStore.active._id === trackId) {
      playerStore.active = track;
      playerStore.play()
    }
    else {
      playerStore.pause ? playerStore.play() : (playerStore.pause = true);
    }
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={(e) => play(e, track._id)}>
        {(active && (playerStore.pause ? <PlayArrow /> : <Pause />)) || (
          <PlayArrow />
        )}
      </IconButton>
      <Image
        width={70}
        height={70}
        src={"http://localhost:5000/" + track.picture}
        alt="track"
      />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active ? (
        <div>
          {formatTrackTime(playerStore.currentTime)} /{" "}
          {formatTrackTime(track.duration)}
        </div>
      ) : (
        <div>{formatTrackTime(track.duration)}</div>
      )}
      <IconButton
        onClick={(e) => e.stopPropagation()}
        style={{ marginLeft: "auto" }}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default observer(TrackItem);
