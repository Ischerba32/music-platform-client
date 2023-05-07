import { useRouter } from "next/router";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import MainLayout from "../../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@mui/material";
import { NextThunkDispatch, wrapper } from "../../../store";
import { fetchAlbums } from "../../../store/actions-creators/album";
import Albums from "../../../components/Albums";
import { albumsStore, userStore } from "../../../store/store";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Error from "next/error";
import { usersStore } from "../../../store/store";
import Users from "../../../components/Users";

const Index = ({ users, errorStatus }) => {
  // const [appUsers, setAppUsers] = useState(users);
  const router = useRouter();
  // const { albums, error } = useTypedSelector((state) => state.album);

  useEffect(() => {
   usersStore.users = users;
  }, [users]);

  // console.log('albums: ', albums);

  // useEffect(() => {
  //   userStore.checkAuth().then(response => !response && router.push('/signIn'));
  // }, [router])

  if (errorStatus) {
    return (
      <Error statusCode={errorStatus} title="I have no permission on this page" />
    );
  }

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Users</h1>
            </Grid>
          </Box>
          <Users />
          {/* <Albums albums={albums} /> */}
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default observer(Index);


export const getServerSideProps: GetServerSideProps = async ({params, req}) => {
  const token = req.cookies['token'];
  try {
    const response = await axios.get('http://localhost:5000/users', {
      headers: {
          'authorization': `Bearer ${token}`
      },
      withCredentials: true
      })
    return {
      props: {
        users: response.data,
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