import { Button, Grid, TextField } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import MainLayout from '../../layout/MainLayout'
import { ITrack } from '../../types/track'

const TrackPage = () => {
  const router = useRouter();
  const track:  ITrack = {
    _id: '1',
    name: 'Demo 1',
    artist: 'John Doe',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium quo est iure quibusdam id explicabo autem voluptas illo dolorem, obcaecati quia porro architecto numquam aliquid cumque eum commodi totam maxime.',
    listens: 5,
    audio: 'http://localhost:5000/audio/5544b27a-6e66-45e8-a1f8-a28a50ca989d.mp3',
    picture: 'http://localhost:5000/image/c3ae983d-98d7-4d0f-a7b4-3a770975e92a.jpg',
    comments: []
  }

  return (
    <MainLayout>
      <Button
        variant={'outlined'}
        style={{fontSize: 18}}
        onClick={() => router.push('/tracks')}
      >
        Back to tracks
      </Button>
      <Grid container style={{margin: '20px 0'}}>
        <Image src={track.picture} width={200} height={200} alt={`${track.name} pic`} />
        <div style={{marginLeft: 30}}>
          <h1>{track.name}</h1>
          <h1>{track.artist}</h1>
          <h1>{track.listens}</h1>
        </div>
      </Grid>
      <h1>Lyrics</h1>
      <p>{track.text}</p>
      <h1>Comments</h1>
      <Grid container>
        <TextField
          label='Name'
          fullWidth
          style={{marginBottom: 20}}
        />
        <TextField
          label='Comment'
          fullWidth
          multiline
          rows={4}
          style={{marginBottom: 20}}
        />
        <Button>Send</Button>
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