import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import { Product } from '../@types'

interface Props {
  product: Product
  className?: ClassProps
}

interface ClassProps {
  width?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: "6px",
      marginRight: '12px',
    },
    subtitle: {
      fontSize: "14px",
      margin: "4px",
      backgroundColor: 'gainsboro',
      width: '100%',
    },
    body: {
      fontSize: "12px",
      margin: "4px",
    },
  })
)

export const ProductProfile: FC<Props> = ({
  product, className
}) => {
  const classes = useStyles(className)

  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='subtitle1' className={classes.subtitle}>制作会社</Typography>
      <Typography variant='body1' className={classes.body}>スクラップ</Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>開催地</Typography>
      <Typography variant='body1' className={classes.body}>東新宿GUNKAN</Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>カテゴリ</Typography>
      <Typography variant='body1' className={classes.body}>屋内</Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>制限時間 / 所要時間</Typography>
      <Typography variant='body1' className={classes.body}>60min / 120min</Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>人数</Typography>
      <Typography variant='body1' className={classes.body}>2人〜10人</Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>成功率</Typography>
      <Typography variant='body1' className={classes.body}>
        {product.successRate ? `${parseFloat(product.successRate.toFixed(1)) * 100}%` : '-'} ({product.successCount}/{product.reviews_count})
      </Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>募集中の同行者募集</Typography>
      <Typography variant='body1' className={classes.body}>3件</Typography>
    </Grid>
  )
}