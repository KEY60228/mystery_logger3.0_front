import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

import { ProductDetail, ReviewDetail, ReviewWithUser, User } from '../../../@types'
import { ReviewCard } from '../../molecules/ReviewCard'

interface Props {
    product: ProductDetail
    edit: (review: ReviewDetail) => void
    setReview: (review: ReviewDetail) => void
    setConfirmOpen: (value: boolean) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
    }),
)

export const ProductReviews: FC<Props> = ({ product, edit, setReview, setConfirmOpen, follow, unfollow, className }) => {
    const classes = useStyles(className)

    return (
        <>
            {product.reviews &&
                product.reviews.map((review: ReviewWithUser) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        reviewerProfile
                        cardActionArea
                        edit={edit}
                        setReview={setReview}
                        setConfirmOpen={setConfirmOpen}
                        follow={follow}
                        unfollow={unfollow}
                    />
                ))}
            {!product.reviews && (
                <Card className={classes.root}>
                    <Typography>まだ投稿はありません</Typography>
                </Card>
            )}
        </>
    )
}
