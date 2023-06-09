

import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { FC, useEffect } from 'react'
import { IAlbum } from '../../../types/album';
import MainLayout from '../../../layouts/MainLayout';
import { Box, Button, Card, Grid } from '@mui/material';
import TrackList from '../../../components/TrackList';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import { tracksStore, userStore } from '../../../store/store';

interface AlbumPageProps {
  serverAlbum: IAlbum;
}

const AlbumPage: FC<AlbumPageProps> = ({serverAlbum}) => {
  const router = useRouter();
  console.log(serverAlbum);

  useEffect(() => {
    tracksStore.tracks = serverAlbum.tracks;
  }, [serverAlbum])

  return (
    <MainLayout title={`${serverAlbum.artist.username} - ${serverAlbum.name}`}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>{`${serverAlbum.artist.username} - ${serverAlbum.name}`}</h1>
              {userStore.userRole === 'artist' && (
                <Button onClick={() => router.push(`/artist/albums/${serverAlbum._id}/track/add`)}>
                  Add track
                </Button>
              )}
            </Grid>
          </Box>
          <TrackList tracks={serverAlbum.tracks} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default observer(AlbumPage);


export const getServerSideProps: GetServerSideProps = async ({params, req}) => {
  const token = req.cookies['token'];
  const response = await axios.get('http://localhost:5000/albums/' + params.id, {
    headers: {
        'authorization': `Bearer ${token}`
    },
    withCredentials: true
    })
  return {
    props: {
        serverAlbum: response.data
    }
  }
}