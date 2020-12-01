import React, { FC, useState } from 'react'
import { Card } from '@material-ui/core'

import { ReviewDetail, User } from '../../@types'
import { ReviewCard } from '../molecules/ReviewCard'
import { ConfirmDeleteReview } from '../molecules/ConfirmDeleteReview'
import { ReviewForm } from '../molecules/ReviewForm/'
import { TempSpace } from '../molecules/TempSpace'

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
    likeReview: (review: ReviewDetail) => void
    unlikeReview: (review: ReviewDetail) => void
}

export const Timeline: FC<Props> = props => {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [openComment, setOpenComment] = useState<number | false>(false)

    return (
        <>
            {props.reviews.map((review: ReviewDetail) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    reviewerProfile
                    cardActionArea
                    productTitle
                    productCard
                    edit={props.edit}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    setConfirmOpen={setConfirmOpen}
                    comment={props.comment}
                    setComment={props.setComment}
                    postComment={props.postComment}
                    likeReview={props.likeReview}
                    unlikeReview={props.unlikeReview}
                    open={openComment}
                    setOpen={setOpenComment}
                    className={{ margin: '8px' }}
                />
            ))}
            {!props.reviews.length && <Card>まだ投稿はありません</Card>}
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
            {props.review && (
                <ReviewForm
                    open={props.open}
                    setOpen={props.setOpen}
                    rating={props.rating}
                    setRating={props.setRating}
                    result={props.result}
                    setResult={props.setResult}
                    joined_at={props.joined_at}
                    setJoined_at={props.setJoined_at}
                    contents={props.contents}
                    setContents={props.setContents}
                    update={props.update}
                    isNew={false}
                    product={props.review.product}
                />
            )}
            <ConfirmDeleteReview
                deleteReview={props.deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
