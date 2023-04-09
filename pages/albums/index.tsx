import { useRouter } from "next/router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MainLayout from "../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@mui/material";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchAlbums } from "../../store/actions-creators/album";
import Albums from "../../components/Albums";

const Index = () => {
  const router = useRouter();
  const { albums, error } = useTypedSelector((state) => state.album);

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"Список альбомов - музыкальная площадка"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push("/albums/create")}>
                Создать
              </Button>
            </Grid>
          </Box>
          <Albums albums={albums} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchAlbums());

    return {
      props: {}
    }
  }
)