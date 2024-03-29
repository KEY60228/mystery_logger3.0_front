import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider } from '@material-ui/core'

import { ReviewIndex, Review, ReviewContents, ReviewDetail, User } from '../../@types'
import { ReviewCardWithProduct } from '../../reusable/ReviewCardWithProduct'
import { Footer } from '../../reusable/Footer'
import { ReviewForm } from '../../reusable/ReviewForm'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores'
import { LinearLoader } from '../../handlers/Loader/LinearLoader'
import { headerHeight, footerHeight } from '../../util'
import { DisplayAdsCard } from '../../reusable/DisplayAdsCard'
import { ReviewAdsCard } from '../../reusable/ReviewAdsCard'

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
    follow: (user: User) => void
    unfollow: (user: User) => void
    likeReview: (review: Review) => void
    unlikeReview: (review: Review) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '0 auto 40px',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - 40px)`,
            maxWidth: '600px',
        },
        innerBox: {
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
                <Box className={classes.innerBox}>
                    {props.reviews.map((review, index) =>
                        <React.Fragment key={review.id}>
                            {(index !== 0 && index % 5 === 0) &&
                                <ReviewAdsCard />
                            }
                            <ReviewCardWithProduct
                                review={review}
                                editReview={props.editReview}
                                deleteReview={props.deleteReview}
                                follow={props.follow}
                                unfollow={props.unfollow}
                                likeReview={props.likeReview}
                                unlikeReview={props.unlikeReview}
                            />
                        </React.Fragment>
                    )}
                <DisplayAdsCard />
                </Box>
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