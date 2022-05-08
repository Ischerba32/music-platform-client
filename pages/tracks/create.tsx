import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import FileUpload from '../../components/FileUpload/FileUpload'
import StepWrapper from '../../components/StepWrapper/StepWrapper'
import MainLayout from '../../layout/MainLayout'

const Create = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);

  const nextStep = () => {
    if (activeStep !== 2) setActiveStep(prev => prev + 1);
  }
  const prevStep = () => {
    setActiveStep(prev => prev - 1);
  }

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 &&
          <Grid
            container
            direction={'column'}
            style={{padding: 20}}

          >
            <TextField
              label="Title"
              style={{marginTop: 15}}

            />
            <TextField
              label="Artist"
              style={{marginTop: 15}}
            />
            <TextField
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