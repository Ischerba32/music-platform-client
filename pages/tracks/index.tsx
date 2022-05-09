import MainLayout from '../../layout/MainLayout';
import { Box, Button, Card, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import TrackList from '../../components/TrackList/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/action-creators/tracks';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

const Tracks = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector(state => state.tracks);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState(null);

  const dispatch = useDispatch() as NextThunkDispatch;

  const search = async (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer)
    }

    setTimer(setTimeout(async () => {
      await dispatch(await searchTracks(e.target.value));
    }, 1000))
  }

  if (error) {
    return <MainLayout>
      <h1>{error}</h1>
    </MainLayout>
  }

  return (
    <MainLayout title='Tracks - Placify'>
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
          <TextField
            fullWidth
            value={query}
            onChange={search}
          />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Tracks

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(fetchTracks());

  return {
    props: {}
  }
})