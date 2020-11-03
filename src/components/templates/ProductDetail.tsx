import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import {
    ProductDetail as ProductDetailInterface,
    ReviewDetail,
} from '../../@types'
import { ProductContents } from '../organisms/ProductContents/index'
import { ProductReviews } from '../organisms/ProductReviews'
import { TempSpace } from '../molecules/TempSpace'

interface Props {
    product: ProductDetailInterface
    setOpen: (value: boolean) => void
    setIsNew: (value: boolean) => void
    edit: (review: ReviewDetail) => void
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
}) => {
    const classes = useStyles()

    return (
        <>
            <ProductContents
                product={product}
                setModalOpen={setOpen}
                setIsNew={setIsNew}
            />
            <ProductReviews product={product} edit={edit} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
