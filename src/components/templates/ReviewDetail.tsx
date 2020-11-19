import React, { FC, useState } from 'react'

import { ReviewDetail as ReviewDetailInterface, User } from '../../@types'
import { ReviewCard } from '../molecules/ReviewCard'
import { ConfirmDeleteReview } from '../molecules/ConfirmDeleteReview'
import { ProductCardInReviewDetail } from '../organisms/ReviewDetail/ProductCardInReviewDetail'

interface Props {
    review: ReviewDetailInterface
    edit: () => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    deleteReview: () => void
}

export const ReviewDetail: FC<Props> = ({ review, edit, follow, unfollow, deleteReview }) => {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

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
                setConfirmOpen={setConfirmOpen}
            />
            <ConfirmDeleteReview
                deleteReview={deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
