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

export const ReviewDetail: FC<Props> = ({ 
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
    likeReview,
    unlikeReview,
}) => {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [commentOpen, setCommentOpen] = useState<number | false>(false)

    return (
        <>
            <ProductCardM product={review.product} />
            <ReviewCard
                review={review}
                reviewerProfile
                productTitle
                edit={edit}
                follow={follow}
                unfollow={unfollow}
                setConfirmOpen={setConfirmOpen}
                comment={comment}
                setComment={setComment}
                postComment={postComment}
                likeReview={likeReview}
                unlikeReview={unlikeReview}
                open={commentOpen}
                setOpen={setCommentOpen}
            />
            { review.comments &&
                <ReviewComments
                    comments={review.comments}
                />
            }
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
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
            <ConfirmDeleteReview
                deleteReview={deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
