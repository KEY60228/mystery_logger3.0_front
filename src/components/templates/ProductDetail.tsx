import React, { FC } from 'react'
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
import { current } from '@reduxjs/toolkit'

interface Props {
    product: ProductDetailInterface
    currentUser: User | null
    setOpen: (value: boolean) => void
    setIsNew: (value: boolean) => void
    edit: (review: ReviewDetail) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    wanna: (product: Product) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const ProductDetail: FC<Props> = ({
    product,
    currentUser,
    setOpen,
    setIsNew,
    edit,
    follow,
    unfollow,
    wanna,
}) => {
    const classes = useStyles()

    return (
        <>
            <ProductContents
                product={product}
                currentUser={currentUser}
                setModalOpen={setOpen}
                setIsNew={setIsNew}
                wanna={wanna}
            />
            <ProductReviews product={product} edit={edit} follow={follow} unfollow={unfollow} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
