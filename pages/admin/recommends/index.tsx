
import axios from 'axios';
import { observer } from 'mobx-react'
import { GetServerSideProps } from 'next';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { recommendsStore } from '../../../store/store';
import MainLayout from '../../../layouts/MainLayout';
import { Box, Button, Card, Grid } from '@mui/material';
import Recommends from '../../../components/Recommends';

const RecommendsPage = ({ recommends, errorStatus }) => {
  console.log(recommends);
  const router = useRouter();

  useEffect(() => {
    recommendsStore.recommends = recommends;
  }, [recommends])

  if (errorStatus) {
    return (
      <Error statusCode={errorStatus} title='You have no permission on this page' />
    )
  }

  return (
    <MainLayout title={"Список подборок - музыкальная площадка"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Recommends</h1>
              <Button onClick={() => router.push("/admin/recommends/create")}>
                Создать
              </Button>
            </Grid>
          </Box>
          <Recommends recommends={recommends} />
          {/* <Playlists playlists={playlists} /> */}
          {/* <Albums albums={albums} /> */}
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default observer(RecommendsPage);

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const token = req.cookies["token"];
  try {
    const response = await axios.get("http://localhost:5000/recommends", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return {
      props: {
        recommends: response.data,
      },
    };
  } catch(error) {
    return {
      props: {
        errorStatus: error.response.status,
      }
    }
  }
};