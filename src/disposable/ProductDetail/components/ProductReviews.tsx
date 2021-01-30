import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

import { ProductDetail, ReviewDetail, User } from '../../../@types'
import { ReviewCard } from '../../../reusable/ReviewCard'

interface Props {
    product: ProductDetail
    edit: () => void
    setConfirmOpen: (value: boolean) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    comment: string | null
    setComment: (value: string) => void
    postComment: (review: ReviewDetail) => void
    likeReview: (review: ReviewDetail) => void
    unlikeReview: (review: ReviewDetail) => void
    commentOpen: number | false
    setCommentOpen: (value: number | false) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
    }),
)

export const ProductReviews: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            {props.product.reviews &&
                props.product.reviews.map(review => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        reviewerProfile
                        cardActionArea
                        edit={props.edit}
                        setConfirmOpen={props.setConfirmOpen}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        comment={props.comment}
                        setComment={props.setComment}
                        postComment={props.postComment}
                        likeReview={props.likeReview}
                        unlikeReview={props.unlikeReview}
                        open={props.commentOpen}
                        setOpen={props.setCommentOpen}
                    />
                ))}
            {!props.product.reviews && (
                <Card className={classes.root}>
                    <Typography>まだ投稿はありません</Typography>
                </Card>
            )}
        </>
    )
}
