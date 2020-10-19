import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import { ProductDetail, PerformanceWithVenue } from '../@types'

interface Props {
  product: ProductDetail
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

  const getParty = (min: number, max: number) => {
    if (min === null && max === null) {
      return (<Typography variant='body1' className={classes.body}>不明</Typography>)
    }
    if (min === 0) {
      if (max === 0) {
        return (<Typography variant='body1' className={classes.body}>制限なし</Typography>)
      } else {
        return (<Typography variant='body1' className={classes.body}>{`最大${max}人`}</Typography>)
      }
    } else {
      if (max === 0) {
        return (<Typography variant='body1' className={classes.body}>{`最小${min}人`}</Typography>)
      } else {
        return (<Typography variant='body1' className={classes.body}>{`${min}人〜${max}人`}</Typography>)
      }
    }
  }

  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='subtitle1' className={classes.subtitle}>制作会社</Typography>
      <Typography variant='body1' className={classes.body}>
        {product.organizer.name}
      </Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>開催地</Typography>
      { product.performances.map((performance: PerformanceWithVenue) => (
        <Typography key={performance.id} variant='body1' className={classes.body}>
          {performance.venue.name}
        </Typography>
      ))}
      <Typography variant='subtitle1' className={classes.subtitle}>カテゴリ</Typography>
      <Typography variant='body1' className={classes.body}>
        {product.category.name}
      </Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>制限時間 / 所要時間</Typography>
      <Typography variant='body1' className={classes.body}>
        約{product.limitTime}分 / 約{product.requiredTime}分
      </Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>人数</Typography>
      {getParty(product.minParty, product.maxParty)}
      <Typography variant='subtitle1' className={classes.subtitle}>成功率</Typography>
      <Typography variant='body1' className={classes.body}>
        {product.successRate ? `${parseFloat(product.successRate.toFixed(1)) * 100}%` : '-'} ({product.successCount}/{product.reviews_count})
      </Typography>
      <Typography variant='subtitle1' className={classes.subtitle}>募集中の同行者募集</Typography>
      <Typography variant='body1' className={classes.body}>3件</Typography>
    </Grid>
  )
}