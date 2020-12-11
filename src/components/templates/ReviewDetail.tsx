import React, { FC, useState } from 'react'

import { ReviewDetail as ReviewDetailInterface, User } from '../../@types'
import { ProductCardM } from '../molecules/ProductCardM/'
import { ReviewCard } from '../molecules/ReviewCard'
import { ConfirmDeleteReview } from '../molecules/ConfirmDeleteReview'
import { ReviewForm } from '../molecules/ReviewForm/'
import { ReviewComments } from '../organisms/ReviewDetail/ReviewComments/'
import { TempSpace } from '../molecules/TempSpace'

interface Props {
    review: ReviewDetailInterface
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
    postComment: () => void
    likeReview: () => void
    unlikeReview: () => void
}

export const ReviewDetail: FC<Props> = props => {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [commentOpen, setCommentOpen] = useState<number | false>(false)

    return (
        <>
            <ProductCardM product={props.review.product} />
            <ReviewCard
                review={props.review}
                reviewerProfile
                productTitle
                edit={props.edit}
                follow={props.follow}
                unfollow={props.unfollow}
                setConfirmOpen={setConfirmOpen}
                comment={props.comment}
                setComment={props.setComment}
                postComment={props.postComment}
                likeReview={props.likeReview}
                unlikeReview={props.unlikeReview}
                open={commentOpen}
                setOpen={setCommentOpen}
            />
            {props.review.review_comments && (
                <ReviewComments comments={props.review.review_comments} />
            )}
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
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
            <ConfirmDeleteReview
                deleteReview={props.deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
