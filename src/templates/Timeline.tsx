import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { ReviewDetail } from '../@types'
import { ReviewCard } from '../organisms/ReviewCard'

interface Props {
    reviews: ReviewDetail[]
    setOpen: (value: boolean) => void
    setRating: (value: number) => void
    setResult: (value: number) => void
    setJoined_at: (value: string|null) => void
    setContents: (value: string|null) => void
    setIsEdit: (value: boolean) => void
    setReviewId: (value: number) => void
    setReview?: (value: ReviewDetail) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    })
)

export const Timeline: FC<Props> = ({
    reviews, setOpen, setRating, setResult, setJoined_at, setContents, setReview, setIsEdit, setReviewId
}) => {
    const classes = useStyles()

    return (
        <>
            { reviews.map((review: ReviewDetail) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    reviewerProfile
                    cardActionArea
                    productTitle
                    productCard
                    setOpen={setOpen}
                    setRating={setRating}
                    setResult={setResult}
                    setJoined_at={setJoined_at}
                    setContents={setContents}
                    setReview={setReview}
                    setIsEdit={setIsEdit}
                    setReviewId={setReviewId}
                    className={{margin: '8px'}}
                />
            ))}
        </>
    )
}

