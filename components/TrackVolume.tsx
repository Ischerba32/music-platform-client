import { Stack, Slider } from "@mui/material";
import React from "react";

interface TrackVolumeProps {
  left: number;
  right: number;
  onChange: (e) => void;
}

const TrackVolume: React.FC<TrackVolumeProps> = ({ left, right, onChange }) => {
  return (
    <Stack
    //   spacing={4}
      direction="row"
      alignItems="center"
      width="10%"
    >
      <Slider
        min={0}
        max={right}
        value={left}
        onChange={onChange}
        size="small"
      />
      <span>
        {right}
      </span>
    </Stack>
  );
};

export default TrackVolume;
