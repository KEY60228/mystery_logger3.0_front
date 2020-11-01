import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { ReviewDetail as ReviewDetailInterface } from '../@types'
import { ReviewCard } from '../organisms/ReviewCard'
import { ProductCardInReviewDetail } from '../organisms/ProductCardInReviewDetail'

interface Props {
  review: ReviewDetailInterface
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '8px',
    }
  })
)

export const ReviewDetail: FC<Props> = ({
  review
}) => {
  const classes = useStyles()

  return (
    <>
      <ProductCardInReviewDetail product={review.product} />
      <ReviewCard
        review={review}
        reviewerProfile
        productTitle
        className={{margin: '8px'}}
        // 仮
        setOpen={() => console.log()}
        setRating={() => console.log()}
        setResult={() => console.log()}
        setJoined_at={() => console.log()}
        setContents={() => console.log()}
        setIsEdit={() => console.log()}
      />
    </>
  )
}
