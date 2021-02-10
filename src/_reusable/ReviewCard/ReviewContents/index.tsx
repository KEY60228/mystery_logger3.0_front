import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Box, Grid } from '@material-ui/core'

import { Review, Product } from '../../../@types'
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
    getSpoiledContents?: () => void
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

export const ReviewContents: FC<Props> = props => {
    const classes = useStyles(props.className)

    return (
        <>
            {!props.productCard && (
                <Box>
                    {props.cardActionArea && (
                        <WithoutProductCardWithActionArea
                            review={props.review}
                            productTitle={props.productTitle}
                            getSpoiledContents={props.getSpoiledContents}
                            className={props.className}
                        />
                    )}
                    {!props.cardActionArea && (
                        <WithoutProductCardWithoutActionArea
                            review={props.review}
                            productTitle={props.productTitle}
                            getSpoiledContents={props.getSpoiledContents}
                        />
                    )}
                </Box>
            )}
            {props.productCard && props.review.product && (
                <Grid
                    container
                    justify="space-between"
                    alignItems="flex-start"
                    wrap="nowrap"
                >
                    {props.cardActionArea && (
                        <WithProductCardWithActionArea
                            review={props.review}
                            productTitle={props.productTitle}
                            getSpoiledContents={props.getSpoiledContents}
                            className={props.className}
                        />
                    )}
                    {!props.cardActionArea && (
                        <WithProductCardWithoutActionArea
                            review={props.review}
                            productTitle={props.productTitle}
                            getSpoiledContents={props.getSpoiledContents}
                        />
                    )}
                    <ProductCardS product={props.review.product} />
                </Grid>
            )}
        </>
    )
}
