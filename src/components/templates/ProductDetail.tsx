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

interface Props {
    product: ProductDetailInterface
    currentUser: User | null
    review: ReviewDetail | null
    setOpen: (value: boolean) => void
    setIsNew: (value: boolean) => void
    edit: () => void
    deleteReview: () => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    wanna: (product: Product) => void
    unwanna: (product: Product) => void
}

export const ProductDetail: FC<Props> = ({
    product,
    currentUser,
    review,
    setOpen,
    setIsNew,
    edit,
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
            <ConfirmDeleteReview
                deleteReview={deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}
