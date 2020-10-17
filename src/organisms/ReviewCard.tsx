import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardMedia, Grid, Box, Typography } from '@material-ui/core'

import { Review, User, Product } from '../@types'
import { Ratings } from '../atoms/Ratings'
import { ReviewerProfile } from '../molecules/ReviewerProfile'
import { ReviewContents } from '../molecules/ReviewContents'

import { ProductCard } from './ProductCard'

interface ReviewDetail extends Review {
  user?: User
  product?: Product
}

interface Props {
  review: ReviewDetail
  reviewerProfile?: boolean
  cardActionArea?: boolean
  productTitle?: boolean
  productCard?: boolean
  shorten?: boolean
  className?: ClassProps
}

interface ClassProps {
  margin?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (className: ClassProps) => ({
      margin: className.margin,
      padding: '8px'
    }),
  })
)

export const ReviewCard: FC<Props> = ({
  review, reviewerProfile, cardActionArea, productTitle, productCard, shorten, className
}) => {
  const classes = useStyles(className)

  return (
    <Card className={classes.root}>
      { (reviewerProfile && review.user) &&
        <ReviewerProfile user={review.user} />
      }
      <ReviewContents
        review={review}
        productCard={productCard}
        productTitle={productTitle}
        cardActionArea={cardActionArea}
        className={productCard ? {minHeight:'200px'} : {}}
      />
    </Card>
  )
}

