import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, TextField, Button, IconButton, Typography } from '@material-ui/core'
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

export const ReviewCard: FC<Props> = ({
    review,
    reviewerProfile,
    cardActionArea,
    productTitle,
    productCard,
    shorten,
    edit,
    setConfirmOpen,
    follow,
    unfollow,
    comment,
    setComment,
    postComment,
    likeReview,
    unlikeReview,
    open,
    setOpen,
    className,
}) => {
    const classes = useStyles(className)

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const localPostComment = () => {
        postComment(review)
        setOpen(false)
        setComment('')
    }

    const localLikeReview = () => {
        likeReview(review)
    }

    const localUnlikeReview = () => {
        unlikeReview(review)
    }

    return (
        <Card className={classes.root}>
            {reviewerProfile && review.user && (
                <ReviewerProfile
                    review={review}
                    setConfirmOpen={setConfirmOpen}
                    edit={edit}
                    follow={follow}
                    unfollow={unfollow} 
                />
            )}
            <ReviewContents
                review={review}
                productCard={productCard}
                productTitle={productTitle}
                cardActionArea={cardActionArea}
                className={productCard ? { minHeight: '200px' } : {}}
            />
            <Grid container justify='space-around' className={classes.icons}>
                <IconButton size='small' onClick={() => open === review.id ? setOpen(false) : setOpen(review.id)}>
                    <ChatBubbleIcon color='action' fontSize="small" />
                    { review.comments_count !== 0 &&
                        <Typography variant="button" className={classes.iconText}>{review.comments_count}</Typography>
                    }
                </IconButton>
                { (currentUser && currentUser.like_reviews_id.includes(review.id)) &&
                    <IconButton size='small' onClick={localUnlikeReview}>
                        <FavoriteIcon color='error' fontSize="small" />
                        { review.review_likes_count !== 0 &&
                            <Typography variant="button" className={classes.iconText}>{review.review_likes_count}</Typography>
                        }
                    </IconButton>
                }
                { (!currentUser || !currentUser.like_reviews_id.includes(review.id)) &&
                    <IconButton size='small' onClick={localLikeReview}>
                        <FavoriteIcon color='action' fontSize="small" />
                        { review.review_likes_count !== 0 &&
                            <Typography variant="button" className={classes.iconText}>{review.review_likes_count}</Typography>
                        }
                    </IconButton>
                }
                <IconButton size='small'>
                    <RepeatIcon color='disabled' fontSize="small" />
                    { review.retweet_count !== 0 &&
                        <Typography variant="button" className={classes.iconText}>{review.retweet_count}</Typography>
                    }
                </IconButton>
                <IconButton size='small'>
                    <ShareIcon color='action' fontSize="small" />
                </IconButton>
            </Grid>
            { open === review.id &&
                <>
                    <TextField 
                        fullWidth
                        multiline
                        variant='outlined'
                        placeholder='Comment'
                        rows={4}
                        margin='dense'
                        value={comment}
                        onChange={ev => setComment(ev.currentTarget.value)}
                    />
                    <Grid container justify='flex-end'>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={localPostComment}
                        >
                            コメント
                        </Button>
                    </Grid>
                </>
            }
        </Card>
    )
}
