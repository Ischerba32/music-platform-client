import { useRouter } from "next/router";
import MainLayout from "../../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@mui/material";
import { NextThunkDispatch, wrapper } from "../../../store";
import Albums from "../../../components/Albums";
import { albumsStore, userStore } from "../../../store/store";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Error from "next/error";

const Index = () => {
  const router = useRouter();
  // const { albums, error } = useTypedSelector((state) => state.album);

  useEffect(() => {
    userStore
      .checkAuth()
      .then(() => albumsStore.fetchAlbums().then((res) => console.log(res)));
  }, []);

  // console.log('albums: ', albums);

  // useEffect(() => {
  //   userStore.checkAuth().then(response => !response && router.push('/signIn'));
  // }, [router])

  // if (errorStatus) {
  //   return (
  //     <Error statusCode={errorStatus} title="I have no permission on this page" />
  //   );
  // }

  return (
    <MainLayout title={"Список альбомов - музыкальная площадка"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Albums</h1>
              <Button onClick={() => router.push("/artist/albums/create")}>
                Создать
              </Button>
            </Grid>
          </Box>
          <Albums />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default observer(Index);

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const dispatch = store.dispatch as NextThunkDispatch;
//     await dispatch(await fetchAlbums());

//     return {
//       props: {}
//     }
//   }
// )

// export const getServerSideProps: GetServerSideProps = async ({params, req}) => {
//   const token = req.cookies['token'];
//   try {
//     const response = await axios.get('http://localhost:5000/albums/all', {
//       headers: {
//           'authorization': `Bearer ${token}`
//       },
//       withCredentials: true
//       })
//     return {
//       props: {
//         albums: response.data,
//       }
//     }
//   } catch (error) {
//     return {
//       props: {
//           errorStatus: error.response.status
//       }
//     }
//   }
// }
