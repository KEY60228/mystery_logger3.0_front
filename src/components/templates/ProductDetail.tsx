import React, { FC, useState } from 'react'

import {
    Product,
    ProductDetail as ProductDetailInterface,
    ReviewDetail,
    User,
} from '../../@types'
import { TempSpace } from '../molecules/TempSpace'
import { ConfirmDeleteReview } from '../molecules/ConfirmDeleteReview'
import { ProductContents } from '../organisms/ProductDetail/ProductContents/'
import { ProductReviews } from '../organisms/ProductDetail/ProductReviews'
import { ReviewForm } from './ReviewForm'

interface Props {
    currentUser: User | null
    product: ProductDetailInterface
    review: ReviewDetail | null
    isNew: boolean
    setIsNew: (value: boolean) => void
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
    post: () => void
    update: () => void
    deleteReview: () => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    wanna: (product: Product) => void
    unwanna: (product: Product) => void
}

export const ProductDetail: FC<Props> = ({
    currentUser,
    product,
    review,
    isNew,
    setIsNew,
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
    post,
    update,
    deleteReview,
    follow,
    unfollow,
    wanna,
    unwanna,
}) => {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

    return (
        <>
            <ProductContents
                product={product}
                currentUser={currentUser}
                setModalOpen={setOpen}
                setIsNew={setIsNew}
                edit={edit}
                wanna={wanna}
                unwanna={unwanna}
            />
            <ProductReviews product={product} edit={edit} setConfirmOpen={setConfirmOpen} follow={follow} unfollow={unfollow} />
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
                post={post}
                update={update}
                isNew={isNew}
                product={product}
            />
            <ConfirmDeleteReview
                deleteReview={deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
