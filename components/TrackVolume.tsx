import React from 'react';

interface TrackVolumeProps {
    left: number;
    right: number;
    onChange: (e) => void;
}

const TrackVolume: React.FC<TrackVolumeProps> = ({left, right, onChange}) => {
    return (
        <div style={{display: 'flex'}}>
            <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />

            <div>{left} / {right}</div>
        </div>
    );
}

export default TrackVolume
