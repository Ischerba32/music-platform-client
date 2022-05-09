import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import FileUpload from '../../components/FileUpload/FileUpload'
import StepWrapper from '../../components/StepWrapper/StepWrapper'
import { useInput } from '../../hooks/useInput'
import MainLayout from '../../layout/MainLayout'

const Create = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);

  const router = useRouter()

  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');

  const nextStep = () => {
    if (activeStep !== 2) setActiveStep(prev => prev + 1);
    else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('text', text.value);
      formData.append('artist', artist.value);
      formData.append('audio', audio);
      formData.append('picture', picture);

      axios.post('http://localhost:5000/tracks', formData)
      .then(response => router.push('/tracks'))
      .catch(error => console.error(error))
    }
  }
  const prevStep = () => {
    setActiveStep(prev => prev - 1);
  }

  return (
    <MainLayout title='Upload - Placify'>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 &&
          <Grid
            container
            direction={'column'}
            style={{padding: 20}}

          >
            <TextField
              {...name}
              label="Title"
              style={{marginTop: 15}}

            />
            <TextField
              {...artist}
              label="Artist"
              style={{marginTop: 15}}
            />
            <TextField
              {...text}
              label="Lyrics"
              style={{marginTop: 15}}
              multiline
              rows={3}
            />
          </Grid>
        }
        {activeStep === 1 &&
          <FileUpload
            setFile={setPicture}
            accept='image/*'

          >
            <Button>Load image</Button>
          </FileUpload>
        }
        {activeStep === 2 &&
          <FileUpload
          setFile={setAudio}
          accept='audio/*'

        >
          <Button>Load audio</Button>
        </FileUpload>
        }
      </StepWrapper>
      <Grid container justifyContent='space-between'>
        <Button
          disabled={activeStep === 0}
          onClick={prevStep}
        >
            Back
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </Grid>
    </MainLayout>
  )
}

export default Create