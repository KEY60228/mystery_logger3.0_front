import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { ReviewDetail as ReviewDetailInterface, User } from '../../@types'
import { ReviewCard } from '../molecules/ReviewCard'
import { ProductCardInReviewDetail } from '../organisms/ProductCardInReviewDetail'

interface Props {
    review: ReviewDetailInterface
    edit: () => void
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

export const ReviewDetail: FC<Props> = ({ review, edit, follow, unfollow }) => {
    const classes = useStyles()

    return (
        <>
            <ProductCardInReviewDetail product={review.product} />
            <ReviewCard
                review={review}
                reviewerProfile
                productTitle
                edit={edit}
                follow={follow}
                unfollow={unfollow}
            />
        </>
    )
}
