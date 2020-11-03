import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { ReviewDetail } from '../../@types'
import { ReviewCard } from '../molecules/ReviewCard'

interface Props {
    reviews: ReviewDetail[]
    edit: (review: ReviewDetail) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const Timeline: FC<Props> = ({ reviews, edit }) => {
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
                    className={{ margin: '8px' }}
                />
            ))}
        </>
    )
}
