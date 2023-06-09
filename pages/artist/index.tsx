import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { Box, Grid } from "@mui/material";
import { userStore } from "../../store/store";
import { observer } from "mobx-react";

const Index = () => {
  return (
    <>
      <MainLayout>
        <Grid container justifyContent="center" alignContent="center" direction={"column"}>
          <Box p={3}>
            <h1>Welcome back, {userStore.username}</h1>
          </Box>
        </Grid>
      </MainLayout>
    </>
  );
};

export default observer(Index);
