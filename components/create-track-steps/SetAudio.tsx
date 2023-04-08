/**
 * See SetPicture component
 */
import React from 'react';
import FileUpload from '../FileUpload';
import { Button } from '@mui/material';

interface SetAudioProps {
    setAudio: React.Dispatch<any>;
}

const SetAudio: React.FC<SetAudioProps> = ({setAudio}) => {
    return (
        <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить аудио</Button>
        </FileUpload>
    )
}

export default SetAudio
