import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider } from '@material-ui/core'

import { ReviewContents, ReviewDetail as ReviewDetailInterface } from '../../@types'
import { Footer } from '../../reusable/Footer'

import { ReviewCard } from '../../reusable/ReviewCard'
import { ReviewCommentCard } from './components/ReviewCommentCard'
import { ProductCard } from '../../reusable/ProductCard'
import { ReviewForm } from '../../reusable/ReviewForm'

interface Props {
    review: ReviewDetailInterface
    formOpen: boolean
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    reviewContents: ReviewContents
    setReviewContents: React.Dispatch<React.SetStateAction<ReviewContents>>
    editReview: () => void
    updateReview: () => void
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

export const ReviewDetailTemplate: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <ProductCard product={props.review.product} />
                <Divider className={classes.divider} />
                <ReviewCard
                    review={props.review}
                    editReview={props.editReview}
                    deleteReview={() => console.log() /* 仮 */}
                    follow={() => console.log() /* 仮 */}
                    unfollow={() => console.log() /* 仮 */}
                    likeReview={() => console.log() /* 仮 */}
                    unlikeReview={() => console.log() /* 仮 */}
                />
                { props.review.review_comments.length !== 0 && props.review.review_comments.map(review_comment =>
                    <ReviewCommentCard review_comment={review_comment} />
                )}
            </Box>
            <Footer />
            <ReviewForm
                product={props.review.product}
                formOpen={props.formOpen}
                setFormOpen={props.setFormOpen}
                reviewContents={props.reviewContents}
                setReviewContents={props.setReviewContents}
                postReview={props.updateReview}
            />
        </>
    )
}
