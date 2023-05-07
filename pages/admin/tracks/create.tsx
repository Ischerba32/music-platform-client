import React, {useState} from 'react';
import MainLayout from "../../../layouts/MainLayout";
import StepWrapper from "../../../components/StepWrapper";
import {Button, Grid} from "@mui/material";
import {useInput} from "../../../hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";
import {GeneralInfo, SetPicture, SetAudio} from '../../../components/create-track-steps/';
import $api from '../../../config/axios';


const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            $api.post('http://localhost:5000/tracks', formData)
                .catch(e => console.log(e))
                .finally(() => router.push('/admin/tracks'))
        }
    }

    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <GeneralInfo
                        name={name}
                        artist={artist}
                        text={text}
                    />
                }
                {activeStep === 1 &&
                    <SetPicture picture={picture} setPicture={setPicture} />
                }
                {activeStep === 2 &&
                    <SetAudio setAudio={setAudio} />
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={next}>Далее</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;

