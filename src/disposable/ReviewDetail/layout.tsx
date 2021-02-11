import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider } from '@material-ui/core'

import { ReviewDetail as ReviewDetailInterface } from '../../@types'
import { Footer } from '../../reusable/Footer'

import { ReviewCard } from '../../reusable/ReviewCard'
import { ReviewCommentCard } from './components/ReviewCommentCard'
import { ProductCard } from '../../reusable/ProductCard'

interface Props {
    review: ReviewDetailInterface
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '16px 20px 24px',
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
                <ProductCard product={props.review.product} />
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
