import React, { useEffect } from "react";
// import {Button} from "@material-ui/core";
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";
import { useRouter } from "next/router";
import { recommendsStore, tracksStore, userStore, usersStore } from "../store/store";
import { observer } from "mobx-react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Box, Card, Grid } from "@mui/material";
import Recommends from "../components/Recommends";

const Index = ({recommends, errorStatus}) => {
  const router = useRouter();

  useEffect(() => {
    if (errorStatus) {
      router.push('/signIn')
    }
  }, [errorStatus, router])

  useEffect(() => {
    recommendsStore.recommends = recommends;
  }, [recommends])

  console.log(recommends)


  return (
    <>
      <MainLayout>
      <Grid container justifyContent="center" alignContent="center" direction={"column"}>
        <Box p={3}>
          <h1>Welcome back! {userStore.username}</h1>
        </Box>
        {recommendsStore.recommends?.length !== 0 && (
          <Card style={{ width: 900 }}>
            <Box p={3}>
              <Grid container justifyContent="space-between">
                <h2>Special for you</h2>
              </Grid>
            </Box>
            <Recommends />
          </Card>
        )}
      </Grid>
      </MainLayout>
    </>
  );
};

export default observer(Index);

export const getServerSideProps: GetServerSideProps = async ({params, req}) => {
  const token = req.cookies['token'];
  try {
    const response = await axios.get('http://localhost:5000/recommends/', {
      headers: {
          'authorization': `Bearer ${token}`
      },
      withCredentials: true
      })
    return {
      props: {
          recommends: response.data
      }
    }
  } catch (error) {
    return {
      props: {
        errorStatus: error.response.status
      }
    }
  }
}
