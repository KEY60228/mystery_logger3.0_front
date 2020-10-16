import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography } from '@material-ui/core'

import { ProductDetail, ReviewWithUser } from '../@types'
import { ReviewCardWithUser } from './ReviewCardWithUser'

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
      margin: '8px',
    }
  })
)

export const ProductReviews: FC<Props> = ({
  product, className
}) => {
  const classes = useStyles(className)

  return (
    <Card className={classes.root}>
      { product.reviews &&
        product.reviews.map((review: ReviewWithUser) => (
          <ReviewCardWithUser key={review.id} review={review} />
        ))
      }
      { !product.reviews &&
        <Typography>まだ投稿はありません</Typography>
      }
    </Card>
  )
}
