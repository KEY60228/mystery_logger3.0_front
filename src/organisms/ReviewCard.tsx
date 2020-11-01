import React, { FC, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

import { Review, User, Product } from '../@types'
import { ReviewerProfile } from '../molecules/ReviewerProfile'
import { ReviewContents } from '../molecules/ReviewContents'

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
  setOpen: (value: boolean) => void
  setRating: (value: number) => void
  setResult: (value: number) => void
  setJoined_at: (value: string|null) => void
  setContents: (value: string|null) => void
  setIsEdit: (value: boolean) => void
  setReview?: (value: ReviewDetail) => void
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
  review, reviewerProfile, cardActionArea, productTitle, productCard, shorten, setOpen, setRating, setResult, setJoined_at, setContents, setIsEdit, setReview, className
}) => {
  const classes = useStyles(className)

  useEffect(() => {
    if (setReview) {
      setReview(review)
    }
  }, [])

  return (
    <Card className={classes.root}>
      { (reviewerProfile && review.user) &&
        <ReviewerProfile
          review={review}
          setOpen={setOpen}
          setRating={setRating}
          setResult={setResult}
          setJoined_at={setJoined_at}
          setContents={setContents}
          setIsEdit={setIsEdit}
        />
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

