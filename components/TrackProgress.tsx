import React from 'react';
import formatTrackTime from '../utils/formatTime';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange}) => {
        return (
            <div style={{display: 'flex'}}>
                <input
                    type="range"
                    min={0}
                    max={right}
                    value={left}
                    onChange={onChange}
                />
                <div>{formatTrackTime(left)} / {formatTrackTime(right)}</div>
            </div>
        );
    };

export default TrackProgress;
