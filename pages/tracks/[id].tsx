import React, { useState } from "react";
import { ITrack } from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "../../hooks/useInput";
import { Button, Grid, TextField } from "@mui/material";
import $api from "../../config/axios";
import Image from "next/image";
import { userStore } from "../../store/store";
import { observer } from "mobx-react";

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");

  const addComment = async () => {
    try {
      const response = await $api.post("/tracks/comment", {
        username: username.value,
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
        Назад
      </Button>
      <Grid container style={{ margin: "20px 0" }}>
        <Image
          src={"http://localhost:5000/" + track.picture}
          width={200}
          height={200}
          alt="tee"
        />
        <div style={{ marginLeft: 30 }}>
          <h1>Название трека - {track.name}</h1>
          <h1>Исполнитель - {track.artist.username}</h1>
          <h1>Прослушиваний - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Слова в треке</h1>
      <p>{track.text}</p>
      <h1>Комментарии</h1>
      {userStore.userRole !== 'admin' && (
        <Grid container>
            <TextField label="Ваше имя" fullWidth {...username} />
            <TextField label="Комментарий" {...text} fullWidth multiline rows={4} />
            <Button onClick={addComment}>Отправить</Button>
        </Grid>
      )}
      <div>
        {track.comments.map((comment) => (
          <div key={comment._id}>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
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
