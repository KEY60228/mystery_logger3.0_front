import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    Card,
    Grid,
    TextField,
    Button,
    IconButton,
    Typography,
} from '@material-ui/core'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import FavoriteIcon from '@material-ui/icons/Favorite'
import RepeatIcon from '@material-ui/icons/Repeat'
import ShareIcon from '@material-ui/icons/Share'

import { RootState } from '../../../stores/index'
import { Review, User, Product } from '../../../@types'
import { ReviewerProfile } from './ReviewerProfile/'
import { ReviewContents } from './ReviewContents/'

interface ReviewDetail extends Review {
    user?: User
    product?: Product
}

interface Props {
    review: ReviewDetail
    reviewerProfile?: boolean
    cardActionArea?: boolean
    productTitle?: boolean
    productCard?: boolean
    shorten?: boolean
    edit: () => void
    setConfirmOpen: (value: boolean) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    comment: string | null
    setComment: (value: string) => void
    postComment: (review: ReviewDetail) => void
    likeReview: (review: ReviewDetail) => void
    unlikeReview: (review: ReviewDetail) => void
    open: number | false
    setOpen: (value: number | false) => void
    getSpoiledContents?: () => void
    className?: ClassProps
}

interface ClassProps {
    margin?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            margin: className.margin || '8px',
            padding: '8px',
        }),
        icons: {
            marginTop: '8px',
        },
        iconText: {
            fontSize: '12px',
            marginLeft: '4px',
        },
    }),
)

export const ReviewCard: FC<Props> = props => {
    const classes = useStyles(props.className)

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const localPostComment = () => {
        props.postComment(props.review)
        props.setOpen(false)
        props.setComment('')
    }

    const localLikeReview = () => {
        props.likeReview(props.review)
    }

    const localUnlikeReview = () => {
        props.unlikeReview(props.review)
    }

    return (
        <Card className={classes.root}>
            {props.reviewerProfile && props.review.user && (
                <ReviewerProfile
                    review={props.review}
                    setConfirmOpen={props.setConfirmOpen}
                    edit={props.edit}
                    follow={props.follow}
                    unfollow={props.unfollow}
                />
            )}
            <ReviewContents
                review={props.review}
                productCard={props.productCard}
                productTitle={props.productTitle}
                cardActionArea={props.cardActionArea}
                getSpoiledContents={props.getSpoiledContents}
                className={props.productCard ? { minHeight: '200px' } : {}}
            />
            <Grid container justify="space-around" className={classes.icons}>
                <IconButton
                    size="small"
                    onClick={() =>
                        props.open === props.review.id
                            ? props.setOpen(false)
                            : props.setOpen(props.review.id)
                    }
                >
                    <ChatBubbleIcon color="action" fontSize="small" />
                    {props.review.review_comments_count !== 0 && (
                        <Typography
                            variant="button"
                            className={classes.iconText}
                        >
                            {props.review.review_comments_count}
                        </Typography>
                    )}
                </IconButton>
                {currentUser &&
                    currentUser.like_reviews_id.includes(props.review.id) && (
                        <IconButton size="small" onClick={localUnlikeReview}>
                            <FavoriteIcon color="error" fontSize="small" />
                            {props.review.review_likes_count !== 0 && (
                                <Typography
                                    variant="button"
                                    className={classes.iconText}
                                >
                                    {props.review.review_likes_count}
                                </Typography>
                            )}
                        </IconButton>
                    )}
                {(!currentUser ||
                    !currentUser.like_reviews_id.includes(props.review.id)) && (
                    <IconButton size="small" onClick={localLikeReview}>
                        <FavoriteIcon color="action" fontSize="small" />
                        {props.review.review_likes_count !== 0 && (
                            <Typography
                                variant="button"
                                className={classes.iconText}
                            >
                                {props.review.review_likes_count}
                            </Typography>
                        )}
                    </IconButton>
                )}
                <IconButton size="small">
                    <RepeatIcon color="disabled" fontSize="small" />
                    {props.review.retweet_count !== 0 && (
                        <Typography
                            variant="button"
                            className={classes.iconText}
                        >
                            {props.review.retweet_count}
                        </Typography>
                    )}
                </IconButton>
                <IconButton size="small">
                    <ShareIcon color="action" fontSize="small" />
                </IconButton>
            </Grid>
            {props.open === props.review.id && (
                <>
                    <TextField
                        fullWidth
                        multiline
                        variant="outlined"
                        placeholder="Comment"
                        rows={4}
                        margin="dense"
                        value={props.comment}
                        onChange={ev =>
                            props.setComment(ev.currentTarget.value)
                        }
                    />
                    <Grid container justify="flex-end">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={localPostComment}
                        >
                            コメント
                        </Button>
                    </Grid>
                </>
            )}
        </Card>
    )
}
