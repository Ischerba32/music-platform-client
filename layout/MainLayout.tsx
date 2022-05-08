import { Container } from "@mui/material";
import { FC, ReactNode } from "react"
import Navbar from "../components/Navbar/Navbar"

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
    </>
  )
}

export default MainLayout