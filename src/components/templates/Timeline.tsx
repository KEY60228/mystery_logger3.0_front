import React, { FC, useState } from 'react'

import { ReviewDetail, User } from '../../@types'
import { ReviewCard } from '../molecules/ReviewCard'
import { ConfirmDeleteReview } from '../molecules/ConfirmDeleteReview'

interface Props {
    reviews: ReviewDetail[]
    edit: () => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    deleteReview: () => void
}

export const Timeline: FC<Props> = ({ reviews, edit, follow, unfollow, deleteReview }) => {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

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
                    setConfirmOpen={setConfirmOpen}
                    className={{ margin: '8px' }}
                />
            ))}
            <ConfirmDeleteReview
                deleteReview={deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
