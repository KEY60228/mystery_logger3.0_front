import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { ProductDetail } from '../../@types'
import { ProductContents } from './components/ProductContents'
import { ReviewCard } from '../../reusable/ReviewCard'
import { Footer } from '../../reusable/Footer'

interface Props {
    product: ProductDetail
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '16px 20px 24px',
        },
    })
)

export const ProductDetailTemplate: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <ProductContents product={props.product} />
                {props.product.reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </Box>
            <Footer />
        </>
    )
}