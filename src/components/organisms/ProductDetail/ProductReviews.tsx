import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

import { ProductDetail, ReviewDetail, ReviewWithUser, User } from '../../../@types'
import { ReviewCard } from '../../molecules/ReviewCard'

interface Props {
    product: ProductDetail
    edit: () => void
    setConfirmOpen: (value: boolean) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    comment: string | null
    setComment: (value: string) => void
    postComment: (review: ReviewDetail) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
    }),
)

export const ProductReviews: FC<Props> = ({ product, edit, setConfirmOpen, follow, unfollow, comment, setComment, postComment }) => {
    const classes = useStyles()

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
                        setConfirmOpen={setConfirmOpen}
                        follow={follow}
                        unfollow={unfollow}
                        comment={comment}
                        setComment={setComment}
                        postComment={postComment}
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
