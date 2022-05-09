import MainLayout from '../../layout/MainLayout';
import { Box, Button, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { ITrack } from '../../types/track';
import TrackList from '../../components/TrackList/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks } from '../../store/action-creators/tracks';

const Tracks = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector(state => state.tracks);

  if (error) {
    return <MainLayout>
      <h1>{error}</h1>
    </MainLayout>
  }

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

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(fetchTracks());

  return {
    props: {}
  }
})