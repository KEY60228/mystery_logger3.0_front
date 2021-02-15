import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { ProductDetail, ReviewContents, Review } from '../../@types'
import { ProductContents } from './components/ProductContents'
import { ReviewCard } from '../../reusable/ReviewCard'
import { Footer } from '../../reusable/Footer'
import { ReviewForm } from '../../reusable/ReviewForm'

interface Props {
    product: ProductDetail
    formOpen: boolean
    setFormOpen: (value: boolean) => void
    reviewContents: ReviewContents
    setReviewContents: React.Dispatch<React.SetStateAction<ReviewContents>> 
    editReview: () => void
    postReview: () => void
    deleteReview: (review: Review) => void
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
                <ProductContents
                    product={props.product}
                    editReview={props.editReview}
                />
                {props.product.reviews.map(review => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        deleteReview={props.deleteReview}
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