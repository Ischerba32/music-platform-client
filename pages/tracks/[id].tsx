import React, { useState } from "react";
import { ITrack } from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "../../hooks/useInput";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import $api from "../../config/axios";
import Image from "next/image";
import { userStore } from "../../store/store";
import { observer } from "mobx-react";
import { Person } from "@mui/icons-material";

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");

  const addComment = async () => {
    try {
      const response = await $api.post("/tracks/comment", {
        username: userStore.username,
        text: text.value,
        trackId: track._id,
      });
      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout
      title={"Музыкальная площадка - " + track.name + " - " + track.artist.username}
      keywords={"Музыка, артисты, " + track.name + ", " + track.artist.username}
    >
      <Button
        variant={"outlined"}
        style={{ fontSize: 18 }}
        onClick={() => router.back()}
      >
        Back
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <Image
          src={"http://localhost:5000/" + track.picture}
          width={200}
          height={200}
          alt="tee"
        />
        <div style={{ marginLeft: 30 }}>
          <h1>{track.artist.username} - {track.name}</h1>
        </div>
      </Grid>
      {track.text && (
        <>
          <h1>Lyrics</h1>
          <p>{track.text}</p>
        </>
      )}
      <h1>Comments</h1>
      {userStore.userRole !== 'admin' && (
        <Grid container>
          {/* <TextField label="Ваше имя"  {...username} /> */}
          <TextField label="Comment" {...text} multiline rows={4} />
          <Button onClick={addComment}>Send</Button>
        </Grid>
      )}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '20px'
        }}>
        {track.comments.map((comment) => (
          // <div key={comment._id}>
          //   <div>{comment.username}</div>
          //   <div>{comment.text}</div>
          // </div>
          <Card key={comment._id} style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 15,
            width: 'fit-content',
          }}>
            <Box display='flex' alignItems="center" gap={'10px'}>
              <Box width={30} height={30} display="flex" justifyContent="center" alignItems="center">
                <Person />
              </Box>
              <Typography>{comment.username}</Typography>
            </Box>
            <Typography marginLeft={'40px'}>{comment.text}</Typography>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default observer(TrackPage);

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const token = req.cookies["token"];
  const response = await axios.get(
    "http://localhost:5000/tracks/" + params.id,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return {
    props: {
      serverTrack: response.data,
    },
  };
};
