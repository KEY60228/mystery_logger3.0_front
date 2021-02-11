import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Grid, IconButton, Divider } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Rating } from '@material-ui/lab'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import FavoriteIcon from '@material-ui/icons/Favorite'
import RepeatIcon from '@material-ui/icons/Repeat'
import ShareIcon from '@material-ui/icons/Share'

import { ReviewIndex } from '../@types'
import { formatData } from '../util'

import { ProductImage } from './ProductImage'
import { UserImage } from './UserImage'

interface Props {
    review: ReviewIndex
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {

        },
        reviewerInfo: {
            margin: '0 0 0 8px',
            flexGrow: 1,
        },
        reviewerName: {
            lineHeight: '24px',
            fontSize: '15px',
            margin: '0',
        },
        reviewerAccountId: {
            lineHeight: '24px',
            fontSize: '12px',
            margin: '0',
        },
        menuButton: {
            width: '48px',
            height: '48px',
        },
        leftBox: {
            margin: '8px 8px 0',
            flexGrow: 1,
        },
        productName: {
            lineHeight: '24px',
            fontSize: '16px',
            margin: '0',
        },
        ratings: {
            margin: '7px 0 8px',
        },
        ratingLabel: {
            margin: '0 4px',
            lineHeight: '18px',
            fontSize: '12px',
        },
        reviewProperty: {
            lineHeight: '16px',
            fontSize: '12px',
            color: '#C0C0C0',
            marginRight: '16px',
        },
        reviewContents: {
            lineHeight: '24px',
            fontSize: '15px',
            margin: '8px 0 0',
            whiteSpace: 'pre-wrap',
        },
        rightBox: {
            width: '80px',
        },
        reviewCreateDate: {
            lineHeight: '16px',
            fontSize: '12px',
            color: '#C0C0C0',
            textAlign: 'right',
            margin: '0',
        },
        icons: {
            marginTop: '8px',
        },
        iconText: {
            fontSize: '12px',
            marginLeft: '4px',
        },
        divider: {
            marginTop: '16px',
        },
    })
)

export const ReviewCard: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <Grid container wrap='nowrap'>
                <UserImage
                    user={props.review.user}
                    className={{ height: '48px', width: '48px' }}
                />
                <Box className={classes.reviewerInfo}>
                    <p className={classes.reviewerName}>{props.review.user.name}</p>
                    <p className={classes.reviewerAccountId}>{props.review.user.account_id}</p>
                </Box>
                <IconButton className={classes.menuButton}>
                    <MoreHorizIcon />
                </IconButton>
            </Grid>
            <Grid container justify='space-between' wrap='nowrap'>
                <Box className={classes.leftBox}>
                    <p className={classes.productName}>{props.review.product.name}</p>
                    <Grid container alignItems='center' className={classes.ratings}>
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
                    <Grid container wrap='nowrap'>
                        <span className={classes.reviewProperty}>参加日: {props.review.joined_at}</span>
                        {props.review.result === 1 &&
                            <span className={classes.reviewProperty}>脱出成功！</span>
                        }
                        {props.review.result === 2 &&
                            <span className={classes.reviewProperty}>脱出失敗...</span>
                        }
                    </Grid>
                    <p className={classes.reviewContents}>{props.review.exposed_contents}</p>
                </Box>
                <Grid container direction='column' justify='space-between' className={classes.rightBox}>
                    <ProductImage
                        product={props.review.product}
                        className={{ height: '112px', width: '80px' }}
                    />
                    <p className={classes.reviewCreateDate}>{formatData(new Date(props.review.created_at))}</p>
                </Grid>
            </Grid>
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
            <Divider className={classes.divider} />
        </>
    )
}