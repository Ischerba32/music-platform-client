import React, { ChangeEvent } from 'react'

export interface ITrackProgressProps {
  left: number;
  right: number;
  onChange: (e: ChangeEvent) => void;
}

const TrackProgress = ({left, right, onChange}: ITrackProgressProps): JSX.Element => {
  return (
    <div style={{display: 'flex'}}>
      <input type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>{left} / {right}</div>
    </div>
  )
}

export default TrackProgress