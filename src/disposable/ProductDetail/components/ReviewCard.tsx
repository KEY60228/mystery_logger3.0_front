import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider, Grid, IconButton } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import FavoriteIcon from '@material-ui/icons/Favorite'
import RepeatIcon from '@material-ui/icons/Repeat'
import ShareIcon from '@material-ui/icons/Share'

import { Review, User } from '../../../@types'
import { theme } from '../../../theme'

interface ReviewWithUser extends Review {
    user: User
}

interface Props {
    review: ReviewWithUser
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
        },
        userImage: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
        },
        userName: {
            margin: '0 0 0 8px',
            lineHeight: '24px',
            fontSize: '15px',
            flexGrow: 1,
        },
        userAccount: {
            margin: '0 0 0 8px',
            lineHeight: '24px',
            fontSize: '12px',
            color: '#C0C0C0',
            flexGrow: 1,
        },
        menuButton: {
            width: '48px',
            height: '48px',
            padding: '0',
        },
        reviewProperties: {
            margin: '16px 0 8px',
        },
        rating: {
            marginBottom: '2px',
        },
        ratingLabel: {
            margin: '0 4px',
            lineHeight: '18px',
            fontSize: '12px',
        },
        property: {
            color: '#C0C0C0',
            lineHeight: '16px',
            fontSize: '12px',
            marginRight: '16px',
            display: 'inline-block',
        },
        reviewContents: {
            lineHeight: '24px',
            fontSize: '15px',
            margin: '0',
            whiteSpace: 'pre-wrap',
        },
        postDate: {
            margin: '0',
            textAlign: 'right',
            lineHeight: '16px',
            fontSize: '12px',
            color: '#C0C0C0',
        },
        icons: {
            marginTop: '8px',
        },
        iconText: {
            fontSize: '12px',
            marginLeft: '4px',
        },
        cardDivider: {
            margin: '16px 0',
        },
        resultStamp: {
            height: '64px',
        },
    })
)

export const ReviewCard: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Box>
            <Grid container wrap='nowrap'>
                <img
                    src={`${process.env.API_BASEURL}${props.review.user.image_name}`}
                    className={classes.userImage}
                />
                <Grid container direction='column'>
                    <p className={classes.userName}>{props.review.user.name}</p>
                    <p className={classes.userAccount}>@{props.review.user.account_id}</p>
                </Grid>
                <IconButton className={classes.menuButton}>
                    <MoreHorizIcon />
                </IconButton>
            </Grid>
            <Grid container justify='space-between' wrap='nowrap'>
                <Box className={classes.reviewProperties}>
                    <Grid container alignItems='center' className={classes.rating}>
                        <Rating
                            value={
                                props.review.rating === 0 || props.review.rating === null ? 0 : parseFloat(props.review.rating.toFixed(1))
                            }
                            precision={0.1}
                            readOnly
                            size='small'
                        />
                        <p className={classes.ratingLabel}>{props.review.rating === 0 || props.review.rating === null ? '-' : props.review.rating.toFixed(1)}</p>
                    </Grid>
                    <span className={classes.property}>参加日: {props.review.joined_at || '-'}</span>
                    { props.review.result === 1 &&
                        <span className={classes.property}>脱出成功！</span>
                    }
                    { props.review.result === 2 &&
                        <span className={classes.property}>脱出失敗！</span>
                    }
                </Box>
                { props.review.result === 1 &&
                    <img src='/img/success.jpg' className={classes.resultStamp} />
                }
                { props.review.result === 2 &&
                    <img src='/img/failure.jpg' className={classes.resultStamp} />
                }
            </Grid>
            <p className={classes.reviewContents}>{props.review.exposed_contents}</p>
            <p className={classes.postDate}>{props.review.created_at}</p>
            <Grid container justify="space-around" className={classes.icons}>
                <IconButton
                    size="small"
                >
                    <ChatBubbleIcon color="action" fontSize="small" />
                    {props.review.review_comments_count !== 0 && (
                        <p
                            className={classes.iconText}
                        >
                            {props.review.review_comments_count}
                        </p>
                    )}
                </IconButton>
                <IconButton size="small">
                    <FavoriteIcon color="error" fontSize="small" />
                    {props.review.review_likes_count !== 0 && (
                        <p
                            className={classes.iconText}
                        >
                            {props.review.review_likes_count}
                        </p>
                    )}
                </IconButton>
                <IconButton size="small">
                    <RepeatIcon color="disabled" fontSize="small" />
                    {props.review.retweet_count !== 0 && (
                        <p
                            className={classes.iconText}
                        >
                            {props.review.retweet_count}
                        </p>
                    )}
                </IconButton>
                <IconButton size="small">
                    <ShareIcon color="action" fontSize="small" />
                </IconButton>
            </Grid>
            <Divider className={classes.cardDivider} />
        </Box>
    )
}