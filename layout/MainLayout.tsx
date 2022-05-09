import { Container } from "@mui/material";
import { FC, ReactNode } from "react"
import Navbar from "../components/Navbar/Navbar"
import Player from "../components/Player/Player";

export interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({children}: IMainLayoutProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <Container
        style={
          {margin: '90px 0'}
        }
      >
        {children}
      </Container>
      <Player />
    </>
  )
}

export default MainLayout