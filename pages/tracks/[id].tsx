import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useInput } from '../../hooks/useInput'
import MainLayout from '../../layout/MainLayout'
import { ITrack } from '../../types/track'

export interface ITrackPageProps {
  serverTrack: ITrack;
}

const TrackPage = ({serverTrack}: ITrackPageProps) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();

  const username = useInput('');
  const text = useInput('');
  const addComment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id
      })
      setTrack({...track, comments: [...track.comments, response.data]})
    } catch (error) {
      console.error((error as Error).message);

    }
  }

  return (
    <MainLayout
      title={`${track.artist} - ${track.name} | Placify`}
      keywords={`${track.artist}, ${track.name}`}
    >
      <Button
        variant={'outlined'}
        style={{fontSize: 18}}
        onClick={() => router.push('/tracks')}
      >
        Back
      </Button>
      <Grid container style={{margin: '20px 0'}}>
        <Image
          src={'http://localhost:5000/' + track.picture}
          width={200}
          height={200}
          alt={`${track.name} pic`}
        />
        <div style={{marginLeft: 30}}>
          <h1>{track.name}</h1>
          <h1>{track.artist}</h1>
          <h4>Listens: {track.listens}</h4>
        </div>
      </Grid>
      <h1>Lyrics</h1>
      <p>{track.text}</p>
      <h1>Comments</h1>
      <Grid container>
        <TextField
          {...username}
          label='Name'
          fullWidth
          style={{marginBottom: 20}}
        />
        <TextField
          {...text}
          label='Comment'
          fullWidth
          multiline
          rows={4}
          style={{marginBottom: 20}}
        />
        <Button onClick={addComment}>Send</Button>
      </Grid>
      <div>
        {track.comments.map(comment => (
          <div key={comment._id}>
            <div>{comment.username}</div>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default TrackPage


export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const response = await axios.get('http://localhost:5000/tracks/' + params?.id);

  return {
    props: {
      serverTrack: response.data
    }
  }
}