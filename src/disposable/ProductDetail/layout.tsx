import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { ProductDetail, ReviewContents, Review, User } from '../../@types'
import { ProductContents } from './components/ProductContents'
import { ReviewCard } from '../../reusable/ReviewCard'
import { Footer } from '../../reusable/Footer'
import { ReviewForm } from '../../reusable/ReviewForm'
import { RootState } from '../../stores'
import { useSelector } from 'react-redux'
import { LinearLoader } from '../../_reusable/Loader/LinearLoader'

interface Props {
    product: ProductDetail
    formOpen: boolean
    setFormOpen: (value: boolean) => void
    reviewContents: ReviewContents
    setReviewContents: React.Dispatch<React.SetStateAction<ReviewContents>> 
    editReview: () => void
    postReview: () => void
    deleteReview: (review: Review) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    wanna: () => void
    unwanna: () => void
    likeReview: (review: Review) => void
    unlikeReview: (review: Review) => void
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
    const loading = useSelector((state: RootState) => state.error.loading)

    return (
        <>
            {loading && <LinearLoader />}
            <Box className={classes.root}>
                <ProductContents
                    product={props.product}
                    editReview={props.editReview}
                    wanna={props.wanna}
                    unwanna={props.unwanna}
                />
                {props.product.reviews.map(review => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        editReview={props.editReview}
                        deleteReview={props.deleteReview}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        likeReview={props.likeReview}
                        unlikeReview={props.unlikeReview}
                    />
                ))}
            </Box>
            <Footer />
            <ReviewForm
                product={props.product}
                formOpen={props.formOpen}
                setFormOpen={props.setFormOpen}
                reviewContents={props.reviewContents}
                setReviewContents={props.setReviewContents}
                postReview={props.postReview}
            />
        </>
    )
}