import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { ReviewDetail as ReviewDetailInterface, User } from '../../@types'
import { ReviewCard } from '../molecules/ReviewCard'
import { ProductCardInReviewDetail } from '../organisms/ProductCardInReviewDetail'

interface Props {
    review: ReviewDetailInterface
    follow: (user: User) => void
    unfollow: (user: User) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
    }),
)

export const ReviewDetail: FC<Props> = ({ review, follow, unfollow }) => {
    const classes = useStyles()

    return (
        <>
            <ProductCardInReviewDetail product={review.product} />
            <ReviewCard
                review={review}
                reviewerProfile
                productTitle
                follow={follow}
                unfollow={unfollow}
                // 仮
                edit={review => console.log()}
            />
        </>
    )
}
