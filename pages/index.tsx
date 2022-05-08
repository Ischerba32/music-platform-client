import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar/Navbar'
import MainLayout from '../layout/MainLayout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <MainLayout>
        <div className={styles.center}>
          <h1>Добро пожаловать</h1>
          <h3>Здесь собраны лучшие треки</h3>
        </div>
      </MainLayout>
    </>
  )
}

export default Home
