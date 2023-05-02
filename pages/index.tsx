import React, { useEffect } from "react";
// import {Button} from "@material-ui/core";
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";
import { useRouter } from "next/router";
import { userStore } from "../store/store";
import { observer } from "mobx-react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    userStore.checkAuth().then(response => !response && router.push('/signIn'));
  }, [router])

  return (
    <>
      <MainLayout>
        <div className="center">
          <h1>Добро пожаловать!</h1>
          <h3>Здесь собраны лучшие треки!</h3>
        </div>
      </MainLayout>

      <style jsx>
        {`
          .center {
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `}
      </style>
    </>
  );
};

export default observer(Index);
