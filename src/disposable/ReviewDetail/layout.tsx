import React, { FC, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Grid, Divider } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

import { ReviewDetail as ReviewDetailInterface } from '../../@types'
import { Footer } from '../../reusable/Footer/Footer'
import { theme } from '../../theme'

import { ReviewCard } from '../ProductDetail/components/ReviewCard'
import { ReviewCommentCard } from './components/ReviewCommentCard'

interface Props {
    review: ReviewDetailInterface
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '16px 20px 24px',
        },
        productImage: {
            height: '112px',
            width: '80px',
            backgroundColor: theme.palette.common.black,
            objectFit: 'cover',
            verticalAlign: 'top',
            borderRadius: '10px',
            margin: '0 8px',
        },
        productDetail: {
            flexGrow: 1,
        },
        productTitle: {
            lineHeight: '24px',
            fontSize: '16px',
            margin: '0',
        },
        organizer: {
            lineHeight: '16px',
            fontSize: '10px',
            margin: '0',
            textAlign: 'right',
        },
        providedBy: {
            color: '#C0C0C0',
            marginRight: '4px',
        },
        productPropertyLabels: {
            marginRight: '16px',
        },
        productPropertyLabel: {
            lineHeight: '16px',
            fontSize: '10px',
            color: '#C0C0C0',
            margin: '0',
        },
        productProperty: {
            lineHeight: '16px',
            fontSize: '10px',
            margin: '0',
        },
        ratings: {
            marginTop: '6px',
        },
        ratingLabel: {
            margin: '0 8px',
        },
        divider: {
            margin: '16px 0',
        },
    })
)

export const ReviewDetail: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <Grid container wrap='nowrap'>
                    <img
                        src={`${process.env.API_BASEURL}${props.review.product.image_name}`}
                        className={classes.productImage}
                    />
                    <Box className={classes.productDetail}>
                        <p className={classes.productTitle}>{props.review.product.name}</p>
                        <p className={classes.organizer}><span className={classes.providedBy}>Provided by</span>{props.review.product.organizer.service_name}</p>
                        <Grid container>
                            <Box className={classes.productPropertyLabels}>
                                <p className={classes.productPropertyLabel}>カテゴリ:</p>
                                <p className={classes.productPropertyLabel}>投稿数:</p>
                                <p className={classes.productPropertyLabel}>脱出成功率:</p>
                            </Box>
                            <Box>
                                <p className={classes.productProperty}>{props.review.product.category.name}</p>
                                <p className={classes.productProperty}>{props.review.product.reviews_count}</p>
                                <p className={classes.productProperty}>{props.review.product.success_rate} ({props.review.product.success_count}/{props.review.product.reviews_count - props.review.product.na_count})</p>
                            </Box>
                        </Grid>
                        <Grid container alignItems='center' className={classes.ratings}>
                            <Rating
                                value={
                                    props.review.product.avg_rating === 0 || props.review.product.avg_rating === null ? 0 : parseFloat(props.review.product.avg_rating.toFixed(1))
                                }
                                precision={0.1}
                                readOnly
                                size='small'
                            />
                            <p className={classes.ratingLabel}>{props.review.product.avg_rating === 0 || props.review.product.avg_rating === null ? '-' : props.review.product.avg_rating.toFixed(1)}</p>
                        </Grid>
                    </Box>
                </Grid>
                <Divider className={classes.divider} />
                <ReviewCard review={props.review} />
                { props.review.review_comments.length !== 0 && props.review.review_comments.map(review_comment =>
                    <ReviewCommentCard review_comment={review_comment} />
                )}
            </Box>
            <Footer />
        </>
    )
}
