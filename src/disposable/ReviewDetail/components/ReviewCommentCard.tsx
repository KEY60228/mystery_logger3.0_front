import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Grid, Divider, IconButton } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { ReviewComment, User } from '../../../@types'

interface ReviewCommentWithUser extends ReviewComment {
    user: User
}

interface Props {
    review_comment: ReviewCommentWithUser
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '0 8px',
        },
        userImage: {
            height: '40px',
            width: '40px',
            objectFit: 'cover',
            verticalAlign: 'top',
            borderRadius: '50%',
        },
        userInfo: {
            flexGrow: 1,
        },
        userName: {
            margin: '0 0 0 8px',
            lineHeight: '24px',
            fontSize: '13px',
        },
        userAccount: {
            margin: '0 0 0 8px',
            lineHeight: '16px',
            fontSize: '10px',
            color: '#C0C0C0',
        },
        menuButton: {
            height: '40px',
            width: '40px',
        },
        comment: {
            lineHeight: '16px',
            fontSize: '13px',
            margin: '8px 0 0 0',
        },
        postDate: {
            lineHeight: '16px',
            fontSize: '10px',
            color: '#C0C0C0',
            margin: '0',
            textAlign: 'right',
        },
        divider: {
            marginTop: '8px',
        },
    })
)

export const ReviewCommentCard: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Grid container wrap='nowrap'>
                <img
                    src={`${process.env.API_BASEURL}${props.review_comment.user.image_name}`}
                    className={classes.userImage}
                />
                <Box className={classes.userInfo}>
                    <p className={classes.userName}>{props.review_comment.user.name}</p>
                    <p className={classes.userAccount}>@{props.review_comment.user.account_id}</p>
                </Box>
                <IconButton className={classes.menuButton}>
                    <MoreHorizIcon />
                </IconButton>
            </Grid>
            <p className={classes.comment}>{props.review_comment.contents}</p>
            <p className={classes.postDate}>{props.review_comment.created_at}</p>
            <Divider className={classes.divider} />
        </Box>
    )
}