import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import React from 'react'
import { recommendsStore } from '../store/store';
import styles from '../styles/TrackItem.module.scss'
import { Box, Card, Grid, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const RecommendItem = ({ recommend }) => {
  const router = useRouter();

  const handleClickRecommend = () => {
    router.push('/admin/recommends/' + recommend._id)
  }

  const handleDeleteRecommend = async (e) => {
    e.stopPropagation();
    await recommendsStore.removeRecommend(recommend._id);
  }

  return (
    <Card
      className={styles.track}
      onClick={handleClickRecommend}
    >
    {/* <Box width={70} height={70} /> */}
    <Image width={70} height={70} src={'http://localhost:5000/' + recommend.picture} alt={recommend.name} />
    <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
      <div>{recommend.name}</div>
      {/* <div style={{fontSize: 12, color: 'gray'}}>{album.artist}</div> */}
    </Grid>
    <IconButton onClick={handleDeleteRecommend} style={{marginLeft: 'auto'}}>
      <Delete/>
    </IconButton>
    </Card>
  )
}

export default observer(RecommendItem)