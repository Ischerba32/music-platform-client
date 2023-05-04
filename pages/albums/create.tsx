

import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useInput } from '../../hooks/useInput'
import axios from 'axios'
import MainLayout from '../../layouts/MainLayout'
import StepWrapper from '../../components/StepWrapper'
import { GeneralInfo, SetPicture } from '../../components/create-track-steps'
import { Button, Grid } from '@mui/material'
import $api from '../../config/axios'

const Create = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [picture, setPicture] = useState(null)
  const name = useInput('')
  const artist = useInput('')

  const router = useRouter()

  const next = () => {
    if (activeStep !== 1) {
      setActiveStep(prev => prev + 1)
    } else {
      const formData = new FormData();
      formData.append('artist', artist.value)
      formData.append('name', name.value)
      formData.append('picture', picture)
      $api.post('http://localhost:5000/albums', formData)
        .catch(e => console.log(e))
        .finally(() => router.push('/albums'));
    }
  }

  const back = () => {
    setActiveStep(prev => prev - 1);
  }

  return (
  <MainLayout>
    <StepWrapper activeStep={activeStep} steps={2}>
      {activeStep === 0 &&
          <GeneralInfo
              name={name}
              artist={artist}
          />
      }
      {activeStep === 1 &&
          <SetPicture picture={picture} setPicture={setPicture} />
      }
    </StepWrapper>
    <Grid container justifyContent='space-between'>
      <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
      <Button onClick={next}>Далее</Button>
    </Grid>
    </MainLayout>
  )
}

export default Create