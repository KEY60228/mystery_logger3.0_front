import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Grid, Divider, IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { ReviewComment, User } from '../../../@types'
import { RootState } from '../../../stores'
import { UserImage } from '../../../reusable/UserImage'

interface ReviewCommentWithUser extends ReviewComment {
    user: User
}

interface Props {
    review_comment: ReviewCommentWithUser
    follow: (user: User) => void
    unfollow: (user: User) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '0 8px',
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

    // ログインユーザー
    const currentUser = useSelector((state: RootState) => state.auth.user)

    // メニューの開閉
    const [menu, setMenu] = useState<null | HTMLElement>(null)
    const openMenu = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(ev.currentTarget)
    }

    return (
        <Box className={classes.root}>
            <Grid container wrap='nowrap'>
                <UserImage
                    user={props.review_comment.user}
                    className={{ height: '40px', width: '40px'}}
                />
                <Box className={classes.userInfo}>
                    <p className={classes.userName}>{props.review_comment.user.name}</p>
                    <p className={classes.userAccount}>@{props.review_comment.user.account_id}</p>
                </Box>
                {currentUser?.account_id !== props.review_comment.user.account_id &&
                    <>
                        <IconButton
                            onClick={openMenu}
                            className={classes.menuButton}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                        <Menu
                            anchorEl={menu}
                            open={Boolean(menu)}
                            onClose={() => setMenu(null)}
                        >
                                {!currentUser?.follows_id.includes(props.review_comment.user.id) &&
                                    <MenuItem onClick={() => props.follow(props.review_comment.user)}>
                                        @{props.review_comment.user.account_id}をフォローする
                                    </MenuItem>
                                }
                                {currentUser?.follows_id.includes(props.review_comment.user.id) &&
                                    <MenuItem onClick={() => props.unfollow(props.review_comment.user)}>
                                        @{props.review_comment.user.account_id}のフォローを解除する
                                    </MenuItem>
                                }
                                <MenuItem>この投稿を通報する</MenuItem>
                        </Menu>
                    </>
                }
            </Grid>
            <p className={classes.comment}>{props.review_comment.contents}</p>
            <p className={classes.postDate}>{props.review_comment.created_at}</p>
            <Divider className={classes.divider} />
        </Box>
    )
}