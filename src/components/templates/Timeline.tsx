import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { ReviewDetail, User } from '../../@types'
import { ReviewCard } from '../molecules/ReviewCard'

interface Props {
    reviews: ReviewDetail[]
    edit: (review: ReviewDetail) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const Timeline: FC<Props> = ({ reviews, edit, follow, unfollow }) => {
    const classes = useStyles()

    return (
        <>
            {reviews.map((review: ReviewDetail) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    reviewerProfile
                    cardActionArea
                    productTitle
                    productCard
                    edit={edit}
                    follow={follow}
                    unfollow={unfollow}
                    className={{ margin: '8px' }}
                />
            ))}
        </>
    )
}
