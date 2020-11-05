import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import {
    ProductDetail as ProductDetailInterface,
    ReviewDetail,
    User,
} from '../../@types'
import { ProductContents } from '../organisms/ProductContents/index'
import { ProductReviews } from '../organisms/ProductReviews'
import { TempSpace } from '../molecules/TempSpace'

interface Props {
    product: ProductDetailInterface
    setOpen: (value: boolean) => void
    setIsNew: (value: boolean) => void
    edit: (review: ReviewDetail) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const ProductDetail: FC<Props> = ({
    product,
    setOpen,
    setIsNew,
    edit,
    follow,
    unfollow,
}) => {
    const classes = useStyles()

    return (
        <>
            <ProductContents
                product={product}
                setModalOpen={setOpen}
                setIsNew={setIsNew}
            />
            <ProductReviews product={product} edit={edit} follow={follow} unfollow={unfollow} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
