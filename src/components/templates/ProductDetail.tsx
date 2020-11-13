import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import {
    Product,
    ProductDetail as ProductDetailInterface,
    ReviewDetail,
    User,
} from '../../@types'
import { ProductContents } from '../organisms/ProductContents/index'
import { ProductReviews } from '../organisms/ProductReviews'
import { TempSpace } from '../molecules/TempSpace'
import { ConfirmDeleteReview } from '../molecules/ConfirmDeleteReview'

interface Props {
    product: ProductDetailInterface
    currentUser: User | null
    review: ReviewDetail | null
    setOpen: (value: boolean) => void
    setIsNew: (value: boolean) => void
    setReview: (review: ReviewDetail) => void
    edit: (review: ReviewDetail) => void
    deleteReview: () => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    wanna: (product: Product) => void
    unwanna: (product: Product) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const ProductDetail: FC<Props> = ({
    product,
    currentUser,
    review,
    setOpen,
    setIsNew,
    setReview,
    edit,
    deleteReview,
    follow,
    unfollow,
    wanna,
    unwanna,
}) => {
    const classes = useStyles()

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
            <ProductReviews product={product} edit={edit} setReview={setReview} setConfirmOpen={setConfirmOpen} follow={follow} unfollow={unfollow} />
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
