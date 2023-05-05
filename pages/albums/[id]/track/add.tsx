

import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useInput } from '../../../../hooks/useInput'
import { GetServerSideProps } from 'next'
import MainLayout from '../../../../layouts/MainLayout'
import StepWrapper from '../../../../components/StepWrapper'
import { GeneralInfo, SetAudio, SetPicture } from '../../../../components/create-track-steps'
import { Button, Grid } from '@mui/material'
import $api from '../../../../config/axios'

const Add = ({albumId}) => {
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
        $api.post('/tracks', formData)
          .then(response => $api.post('/albums/track', {
            albumId,
            trackId: response.data._id
          }))
          .catch(e => console.log(e))
          .finally(() => router.push(`/albums/${albumId}`))
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
  )
}

export default Add;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const response = params.id
  return {
    props: {
      albumId: response
    }
  }
}