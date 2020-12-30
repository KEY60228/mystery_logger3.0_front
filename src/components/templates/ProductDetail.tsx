import React, { FC, useState } from 'react'

import {
    Product,
    ProductDetail as ProductDetailInterface,
    ReviewDetail,
    CurrentUser,
    User,
} from '../../@types'
import { ProductContents } from '../organisms/ProductDetail/ProductContents/'
import { ProductReviews } from '../organisms/ProductDetail/ProductReviews'
import { TempSpace } from '../molecules/TempSpace'
import { ConfirmDeleteReview } from '../molecules/ConfirmDeleteReview'
import { ReviewForm } from '../molecules/ReviewForm/'
import { LinearLoader } from '../../Loader/LinearLoader'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores'

interface Props {
    currentUser: CurrentUser | null
    product: ProductDetailInterface
    isNew: boolean
    setIsNew: (value: boolean) => void
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
    post: () => void
    update: () => void
    deleteReview: () => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    wanna: (product: Product) => void
    unwanna: (product: Product) => void
    comment: string | null
    setComment: (value: string) => void
    postComment: (review: ReviewDetail) => void
    likeReview: (review: ReviewDetail) => void
    unlikeReview: (review: ReviewDetail) => void
}

export const ProductDetail: FC<Props> = props => {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [commentOpen, setCommentOpen] = useState<number | false>(false)

    const loading = useSelector((state: RootState) => state.error.loading)

    return (
        <>
            {loading && <LinearLoader />}
            <ProductContents
                product={props.product}
                currentUser={props.currentUser}
                setModalOpen={props.setOpen}
                setIsNew={props.setIsNew}
                edit={props.edit}
                wanna={props.wanna}
                unwanna={props.unwanna}
            />
            <ProductReviews
                product={props.product}
                edit={props.edit}
                setConfirmOpen={setConfirmOpen}
                follow={props.follow}
                unfollow={props.unfollow}
                comment={props.comment}
                setComment={props.setComment}
                postComment={props.postComment}
                likeReview={props.likeReview}
                unlikeReview={props.unlikeReview}
                commentOpen={commentOpen}
                setCommentOpen={setCommentOpen}
            />
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
                post={props.post}
                update={props.update}
                isNew={props.isNew}
                product={props.product}
            />
            <ConfirmDeleteReview
                deleteReview={props.deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
