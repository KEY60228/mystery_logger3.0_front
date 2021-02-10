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

import { RootState, useAppDispatch } from '../../stores/index'
import { Review, User, Product } from '../../@types'
import { ReviewerProfile } from './ReviewerProfile'
import { ReviewContents } from './ReviewContents'
import { setMessage } from '../../stores/error'

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
    edit: (value: ReviewDetail) => void
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
    const dispatch = useAppDispatch()
    const message = useSelector((state: RootState) => state.error.message)

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const localPostComment = () => {
        props.postComment(props.review)
        if (!props.comment) return false
        props.setOpen(false)
        props.setComment('')
    }

    const localLikeReview = () => {
        props.likeReview(props.review)
    }

    const localUnlikeReview = () => {
        props.unlikeReview(props.review)
    }

    const validateComment = (comment: string) => {
        props.setComment(comment)
        if (!comment) {
            if (message) {
                const errors = Object.assign({}, message.errors, {
                    comment: '入力してください',
                })
                dispatch(setMessage({ errors: errors }))
            } else {
                dispatch(
                    setMessage({ errors: { comment: '入力してください' } }),
                )
            }
            return
        }
        if (message) {
            const errors = Object.assign({}, message.errors, { comment: null })
            dispatch(setMessage({ errors: errors }))
        } else {
            dispatch(setMessage(null))
        }
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
                        error={!!message?.errors?.comment}
                        helperText={message?.errors?.comment}
                        margin="dense"
                        value={props.comment}
                        onChange={ev => validateComment(ev.currentTarget.value)}
                    />
                    <Grid container justify="flex-end">
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!!message?.errors?.comment}
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
