import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import { ReviewDetail as ReviewDetailInterface, User } from '../../@types'
import { ProductCardM } from '../../reusable/ProductCardM'
import { ReviewCard } from '../../reusable/ReviewCard'
import { ConfirmDeleteReview } from '../../reusable/ConfirmDeleteReview'
import { ReviewForm } from '../../reusable/ReviewForm'
import { ReviewComments } from '../organisms/ReviewDetail/ReviewComments/'
import { TempSpace } from '../../reusable/TempSpace'
import { LinearLoader } from '../../reusable/Loader/LinearLoader'
import { RootState } from '../../stores'

interface Props {
    review: ReviewDetailInterface
    open: boolean
    setOpen: (value: boolean) => void
    rating: number
    setRating: (value: number) => void
    result: number
    setResult: (value: number) => void
    joined_at: Date | null
    setJoined_at: (value: Date | null) => void
    spoil: boolean
    setSpoil: (value: boolean) => void
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
    getSpoiledContents: () => void
}

export const ReviewDetail: FC<Props> = props => {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [commentOpen, setCommentOpen] = useState<number | false>(false)

    const loading = useSelector((state: RootState) => state.error.loading)

    return (
        <>
            {loading && <LinearLoader />}
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
                getSpoiledContents={props.getSpoiledContents}
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
                spoil={props.spoil}
                setSpoil={props.setSpoil}
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
