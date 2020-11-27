import React, { FC, useState } from 'react'

import { ReviewDetail, User } from '../../@types'
import { ReviewCard } from '../molecules/ReviewCard'
import { ConfirmDeleteReview } from '../molecules/ConfirmDeleteReview'
import { ReviewForm } from '../molecules/ReviewForm/'
import { Card } from '@material-ui/core'

interface Props {
    reviews: ReviewDetail[]
    review: ReviewDetail | null
    open: boolean
    setOpen: (value: boolean) => void
    rating: number
    setRating: (value: number) => void
    result: number
    setResult: (value: number) => void
    joined_at: string | null
    setJoined_at: (value: string | null) => void
    contents: string | null
    setContents: (value: string | null) => void
    edit: () => void
    update: () => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    deleteReview: () => void
    comment: string | null
    setComment: (value: string) => void
    postComment: (review: ReviewDetail) => void
}

export const Timeline: FC<Props> = ({
    reviews,
    review,
    open,
    setOpen,
    rating,
    setRating,
    result,
    setResult,
    joined_at,
    setJoined_at,
    contents,
    setContents,
    edit,
    update,
    follow,
    unfollow,
    deleteReview,
    comment,
    setComment,
    postComment,
}) => {
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
                    comment={comment}
                    setComment={setComment}
                    postComment={postComment}
                    className={{ margin: '8px' }}
                />
            ))}
            { !reviews.length &&
                <Card>
                    まだ投稿はありません
                </Card>
            }
            { review &&
                <ReviewForm
                    open={open}
                    setOpen={setOpen}
                    rating={rating}
                    setRating={setRating}
                    result={result}
                    setResult={setResult}
                    joined_at={joined_at}
                    setJoined_at={setJoined_at}
                    contents={contents}
                    setContents={setContents}
                    update={update}
                    isNew={false}
                    product={review.product}
                />
            }
            <ConfirmDeleteReview
                deleteReview={deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
