import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Box, Grid } from '@material-ui/core'

import { Review, Product } from '../../../../@types'
import { ProductCardS } from '../../ProductCardS'
import { ContentsWithActionArea as WithoutProductCardWithActionArea } from './WithoutProductCard/ContentsWithActionArea'
import { ContentsWithoutActionArea as WithoutProductCardWithoutActionArea } from './WithoutProductCard/ContentsWithoutActionArea'
import { ContentsWithActionArea as WithProductCardWithActionArea } from './WithProductCard/ContentsWithActionArea'
import { ContentsWithoutActionArea as WithProductCardWithoutActionArea } from './WithProductCard/ContentsWithoutActionArea'

interface ReviewWithProduct extends Review {
    product?: Product
}

interface Props {
    review: ReviewWithProduct
    productCard?: boolean
    productTitle?: boolean
    cardActionArea?: boolean
    className?: ClassProps
}

interface ClassProps {
    minHeight?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const ReviewContents: FC<Props> = ({
    review,
    productCard,
    productTitle,
    cardActionArea,
    className,
}) => {
    const classes = useStyles(className)

    return (
        <>
            {!productCard && (
                <Box>
                    {cardActionArea && (
                        <WithoutProductCardWithActionArea
                            review={review}
                            productTitle={productTitle}
                            className={className}
                        />
                    )}
                    {!cardActionArea && (
                        <WithoutProductCardWithoutActionArea
                            review={review}
                            productTitle={productTitle}
                        />
                    )}
                </Box>
            )}
            {productCard && review.product && (
                <Grid
                    container
                    justify="space-between"
                    alignItems="flex-start"
                    wrap="nowrap"
                >
                    {cardActionArea && (
                        <WithProductCardWithActionArea
                            review={review}
                            productTitle={productTitle}
                            className={className}
                        />
                    )}
                    {!cardActionArea && (
                        <WithProductCardWithoutActionArea
                            review={review}
                            productTitle={productTitle}
                        />
                    )}
                    <ProductCardS product={review.product} />
                </Grid>
            )}
        </>
    )
}
