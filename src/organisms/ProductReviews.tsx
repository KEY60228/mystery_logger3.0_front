import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography } from '@material-ui/core'

import { ProductDetail, ReviewWithUser } from '../@types'
import { ReviewCard } from './ReviewCard'

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
          <ReviewCard
            key={review.id}
            review={review}
            reviewerProfile
            cardActionArea
          />
        ))
      }
      { !product.reviews &&
        <Typography>まだ投稿はありません</Typography>
      }
    </Card>
  )
}
