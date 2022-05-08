import MainLayout from '../../layout/MainLayout';
import { Box, Button, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { ITrack } from '../../types/track';
import TrackList from '../../components/TrackList/TrackList';

const Tracks = () => {
  const router = useRouter();
  const tracks: ITrack[] = [
    {
      _id: '1',
      name: 'Demo 1',
      artist: 'John Doe',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium quo est iure quibusdam id explicabo autem voluptas illo dolorem, obcaecati quia porro architecto numquam aliquid cumque eum commodi totam maxime.',
      listens: 5,
      audio: 'http://localhost:5000/audio/5544b27a-6e66-45e8-a1f8-a28a50ca989d.mp3',
      picture: 'http://localhost:5000/image/c3ae983d-98d7-4d0f-a7b4-3a770975e92a.jpg',
      comments: []
    },
    {
      _id: '2',
      name: 'Demo 2',
      artist: 'John Doe',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium quo est iure quibusdam id explicabo autem voluptas illo dolorem, obcaecati quia porro architecto numquam aliquid cumque eum commodi totam maxime.',
      listens: 5,
      audio: 'http://localhost:5000/audio/5544b27a-6e66-45e8-a1f8-a28a50ca989d.mp3',
      picture: 'http://localhost:5000/image/c3ae983d-98d7-4d0f-a7b4-3a770975e92a.jpg',
      comments: []
    },
    {
      _id: '3',
      name: 'Demo 3',
      artist: 'John Doe',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium quo est iure quibusdam id explicabo autem voluptas illo dolorem, obcaecati quia porro architecto numquam aliquid cumque eum commodi totam maxime.',
      listens: 5,
      audio: 'http://localhost:5000/audio/5544b27a-6e66-45e8-a1f8-a28a50ca989d.mp3',
      picture: 'http://localhost:5000/image/c3ae983d-98d7-4d0f-a7b4-3a770975e92a.jpg',
      comments: []
    },
  ]

  return (
    <MainLayout>
      <Grid container justifyContent='center'>
        <Card style={{width: 900}}>
          <Box p={3}>
            <Grid container justifyContent='space-between'>
              <h1>Tracks:</h1>
              <Button
                onClick={() => router.push('/tracks/create')}
              >
                Upload track
              </Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Tracks