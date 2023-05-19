import React from "react";
import formatTrackTime from "../utils/formatTime";
import { Slider, Grid, Stack } from "@mui/material";

interface TrackProgressProps {
  left: number;
  right: number;
  onChange: (e) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  left,
  right,
  onChange,
}) => {
  return (
    <Stack spacing={4} direction="row" alignItems="center" width='15%'>
      <span>{formatTrackTime(left)}</span>
      <Slider
        min={0}
        max={right}
        value={left}
        onChange={onChange}
        size="small"
      />
      <span>
        {formatTrackTime(right)}
      </span>
    </Stack>
    // <div style={{ display: "flex" }}>
    //     <input
    //       type="range"
    //       min={0}
    //       max={right}
    //       value={left}
    //       onChange={onChange}
    //     />
    //   </div>
  );
};

export default TrackProgress;
