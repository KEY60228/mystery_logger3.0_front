import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider } from '@material-ui/core'

import { Review, ReviewContents, ReviewDetail as ReviewDetailInterface, User } from '../../@types'
import { Footer } from '../../reusable/Footer'

import { ReviewCard } from '../../reusable/ReviewCard'
import { ReviewCommentCard } from './components/ReviewCommentCard'
import { ProductCard } from '../../reusable/ProductCard'
import { ReviewForm } from '../../reusable/ReviewForm'
import { RootState } from '../../stores'
import { useSelector } from 'react-redux'
import { LinearLoader } from '../../handlers/Loader/LinearLoader'
import { headerHeight, footerHeight } from '../../util'

interface Props {
    review: ReviewDetailInterface
    formOpen: boolean
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    reviewContents: ReviewContents
    setReviewContents: React.Dispatch<React.SetStateAction<ReviewContents>>
    editReview: () => void
    updateReview: () => void
    deleteReview: () => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    likeReview: (review: Review) => void
    unlikeReview: (review: Review) => void
    getSpoiledContents: () => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '16px 20px 40px',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - 56px)`,
        },
        divider: {
            margin: '16px 0',
        },
    })
)

export const ReviewDetailTemplate: FC<Props> = props => {
    const classes = useStyles()
    const loading = useSelector((state: RootState) => state.error.loading)

    return (
        <>
            {loading && <LinearLoader />}
            <Box className={classes.root}>
                <ProductCard product={props.review.product} />
                <Divider className={classes.divider} />
                <ReviewCard
                    review={props.review}
                    editReview={props.editReview}
                    deleteReview={props.deleteReview}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    likeReview={props.likeReview}
                    unlikeReview={props.unlikeReview}
                    getSpoiledContents={props.getSpoiledContents}
                    link={false}
                />
                { props.review.review_comments.length !== 0 && props.review.review_comments.map(review_comment =>
                    <ReviewCommentCard
                        review_comment={review_comment}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
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
