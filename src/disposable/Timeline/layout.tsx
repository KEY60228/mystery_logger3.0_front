import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider } from '@material-ui/core'

import { ReviewIndex, Review, ReviewContents, ReviewDetail } from '../../@types'
import { ReviewCard } from '../../reusable/ReviewCardWithProduct'
import { Footer } from '../../reusable/Footer'
import { ReviewForm } from '../../reusable/ReviewForm'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores'
import { LinearLoader } from '../../_reusable/Loader/LinearLoader'

interface Props {
    reviews: ReviewIndex[]
    review: ReviewDetail | null
    formOpen: boolean
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    reviewContents: ReviewContents
    setReviewContents: React.Dispatch<React.SetStateAction<ReviewContents>>
    editReview: (review: Review) => void
    postReview: () => void
    deleteReview: (review: Review) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '0 20px',
        },
        title: {
            lineHeight: '32px',
            fontSize: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
            margin: '16px 0',
        },
        divider: {
            margin: '16px auto',
            width: '160px',
        }
    })
)

export const TimelineTemplate: FC<Props> = props => {
    const classes = useStyles()
    const loading = useSelector((state: RootState) => state.error.loading)

    return (
        <>
            {loading && <LinearLoader />}
            <p className={classes.title}>タイムライン</p>
            <Divider className={classes.divider} />
            <Box className={classes.root}>
                {props.reviews.map(review =>
                    <ReviewCard
                        key={review.id}
                        review={review}
                        editReview={props.editReview}
                        deleteReview={props.deleteReview}
                    />
                )}
            </Box>
            <Footer />
            {props.review &&
                <ReviewForm
                    product={props.review.product}
                    formOpen={props.formOpen}
                    setFormOpen={props.setFormOpen}
                    reviewContents={props.reviewContents}
                    setReviewContents={props.setReviewContents}
                    postReview={props.postReview}
                />
            }
        </>
    )
}