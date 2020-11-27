import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, TextField, Button, IconButton, Typography } from '@material-ui/core'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import FavoriteIcon from '@material-ui/icons/Favorite'
import RepeatIcon from '@material-ui/icons/Repeat'
import ShareIcon from '@material-ui/icons/Share'

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
    className,
}) => {
    const classes = useStyles(className)
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Card className={classes.root}>
            {reviewerProfile && review.user && (
                <ReviewerProfile review={review} setConfirmOpen={setConfirmOpen} edit={edit} follow={follow} unfollow={unfollow} />
            )}
            <ReviewContents
                review={review}
                productCard={productCard}
                productTitle={productTitle}
                cardActionArea={cardActionArea}
                className={productCard ? { minHeight: '200px' } : {}}
            />
            <Grid container justify='space-around' className={classes.icons}>
                <IconButton size='small' onClick={() => setOpen(!open)}>
                    <ChatBubbleIcon color='action' fontSize="small" />
                    { review.comment_count !== 0 &&
                        <Typography variant="button" className={classes.iconText}>{review.comment_count}</Typography>
                    }
                </IconButton>
                <IconButton size='small'>
                    <FavoriteIcon color='action' fontSize="small" />
                    { review.like_count !== 0 &&
                        <Typography variant="button" className={classes.iconText}>{review.like_count}</Typography>
                    }
                </IconButton>
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
            { open &&
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
                            onClick={() => postComment(review)}
                        >
                            コメント
                        </Button>
                    </Grid>
                </>
            }
        </Card>
    )
}
