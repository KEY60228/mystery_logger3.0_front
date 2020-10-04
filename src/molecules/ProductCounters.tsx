import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { Product } from '../@types'
import { DoneCounter } from '../atoms/DoneCounter'
import { SuccessRateCounter } from '../atoms/SuccessRateCounter'
import { RatingCounter } from '../atoms/RatingCounter'

interface Props {
  product: Product
  className?: ClassProps
}

interface ClassProps {
  width?: string
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: (className: ClassProps) => ({
      width: className.width,
    }),
  })
)

export const ProductCounters: FC<Props> = ({
  product, className
}) => {
  const classes = useStyles(className)

  return (
    <Grid container justify='space-around' alignItems='center' wrap='nowrap' className={classes.root}>
      <DoneCounter number={product.reviews_count} />
      <SuccessRateCounter number={product.successRate ? `${product.successRate * 100}%` : '-'} />
      <RatingCounter number={product.avgRating ? parseFloat(product.avgRating.toFixed(1)) : '-'} />
    </Grid>
  )
}