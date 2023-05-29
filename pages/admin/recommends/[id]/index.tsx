import axios from 'axios'
import { observer } from 'mobx-react'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import { IRecommend } from '../../../../types/recommend'
import { useRouter } from 'next/router'
import { recommendsStore } from '../../../../store/store'
import MainLayout from '../../../../layouts/MainLayout'
import { Box, Button, Card, Grid } from '@mui/material'
import TrackList from '../../../../components/TrackList'

const RecommendPage = ({ serverRecommend }) => {
  const [currentRecommend, setCurrentRecommend] = useState<IRecommend>(serverRecommend);
  const router = useRouter();

  const handleDeleteTrackFromPlaylist = async (trackId: string) => {
    await recommendsStore.removeTrackFromRecommend(currentRecommend._id, trackId);
    setCurrentRecommend({
      ...currentRecommend,
      tracks: currentRecommend.tracks.filter(track => track._id !== trackId)
    })
  };

  return (
    <MainLayout
      title={serverRecommend.name}
    >
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>
                {serverRecommend.name}
              </h1>
              <Button
                onClick={() =>
                  router.push(`/admin/recommends/${serverRecommend._id}/tracks/add`)
                }
              >
                Add
              </Button>
            </Grid>
          </Box>
          <TrackList
            tracks={currentRecommend.tracks}
            onDelete={handleDeleteTrackFromPlaylist}
          />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default observer(RecommendPage)

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const token = req.cookies["token"];
  const response = await axios.get(
    "http://localhost:5000/recommends/" + params.id,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return {
    props: {
      serverRecommend: response.data,
    },
  };
};