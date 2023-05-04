import React from "react";
import { ITrack } from "../types/track";
import TrackItem from "./TrackItem";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Box, Grid } from "@mui/material";
import { playerStore } from "../store/store";
import { observer } from "mobx-react";

interface TrackListProps {
  tracks: ITrack[];
  onDelete?: (trackId: string) => void;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onDelete }) => {
  // const { active } = useTypedSelector(state => state.player)

  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks?.map((track) => (
          <TrackItem
            key={track._id}
            track={track}
            active={playerStore.active?._id === track._id}
            onDelete={onDelete}
          />
        ))}
      </Box>
    </Grid>
  );
};

export default observer(TrackList);
