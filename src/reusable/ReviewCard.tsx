import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider, Grid, IconButton, Menu, MenuItem } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import FavoriteIcon from '@material-ui/icons/Favorite'
import RepeatIcon from '@material-ui/icons/Repeat'
import ShareIcon from '@material-ui/icons/Share'

import { Review, User } from '../@types'
import { formatDate } from '../util'
import { UserImage } from './UserImage'
import { RootState } from '../stores'
import { useSelector } from 'react-redux'

import { ConfirmDeleteReview } from './ConfirmDeleteReview'

interface ReviewWithUser extends Review {
    user: User
}

interface Props {
    review: ReviewWithUser
    editReview: () => void
    deleteReview: (review: Review) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    likeReview: (review: Review) => void
    unlikeReview: (review: Review) => void
    getSpoiledContents: () => void
    link: boolean
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
            color: '#C0C0C0',
            margin: '0',
        },
        menuButton: {
            width: '48px',
            height: '48px',
            padding: '0',
        },
        tran: {
            '&:hover': {
                cursor: 'pointer',
            },
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
        spoiledContents: {
            lineHeight: '16px',
            fontSize: '13px',
            color: theme.palette.error.main,
            margin: '0',
            '&:hover': {
                cursor: 'pointer',
            }
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
            margin: '0 4px',
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
    const history = useHistory()

    // ログインユーザー
    const currentUser = useSelector((state: RootState) => state.auth.user)

    // メニューの開閉
    const [menu, setMenu] = useState<null | HTMLElement>(null)
    const openMenu = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(ev.currentTarget)
    }

    // レビュー削除確認アラートの開閉
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const confirmDelete = () => {
        setMenu(null)
        setConfirmOpen(true)
    }

    const editReview = () => {
        setMenu(null)
        props.editReview()
    }

    return (
        <>
            <Box>
                <Grid container wrap='nowrap'>
                    <UserImage
                        user={props.review.user}
                        className={{ height: '48px', width: '48px' }}
                    />
                    <Grid container direction='column' className={classes.reviewerInfo}>
                        <p className={classes.reviewerName}>{props.review.user.name}</p>
                        <p className={classes.reviewerAccountId}>@{props.review.user.account_id}</p>
                    </Grid>
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
                        {(currentUser?.account_id !== props.review.user.account_id &&
                            !currentUser?.follows_id.includes(props.review.user.id)) &&
                                <MenuItem onClick={() => props.follow(props.review.user)}>
                                    @{props.review.user.account_id}をフォローする
                                </MenuItem>
                        }
                        {(currentUser?.account_id !== props.review.user.account_id &&
                            currentUser?.follows_id.includes(props.review.user.id)) &&
                                <MenuItem onClick={() => props.unfollow(props.review.user)}>
                                    @{props.review.user.account_id}のフォローを解除する
                                </MenuItem>
                        }
                        {currentUser?.account_id !== props.review.user.account_id &&
                            <MenuItem>この投稿を通報する</MenuItem>
                        }
                        {currentUser?.account_id === props.review.user.account_id &&
                            <MenuItem onClick={editReview}>編集する</MenuItem>
                        }
                        {currentUser?.account_id === props.review.user.account_id &&
                            <MenuItem onClick={confirmDelete}>削除する</MenuItem>
                        }
                    </Menu>
                </Grid>
                <Box
                    onClick={props.link ? () => history.push(`/reviews/${props.review.id}`) : () => false}
                    className={props.link ? classes.tran : ''}
                >
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
                                <span className={classes.property}>脱出失敗...</span>
                            }
                        </Box>
                        { props.review.result === 1 &&
                            <img src='/img/success.jpg' className={classes.resultStamp} />
                        }
                        { props.review.result === 2 &&
                            <img src='/img/failure.jpg' className={classes.resultStamp} />
                        }
                    </Grid>
                    {!props.review.spoil &&
                        <p className={classes.reviewContents}>
                            {props.review.exposed_contents}
                        </p>
                    }
                    {props.review.spoil &&
                        <p
                            onClick={props.getSpoiledContents}
                            className={classes.spoiledContents}
                        >
                            ※ネタバレを表示する
                            <span dangerouslySetInnerHTML={{__html: '<!-- 見いたあなあああ！！！！ -->'}}></span>
                        </p>
                    }
                    <p className={classes.postDate}>{formatDate(new Date(props.review.created_at.replace(/-/g, "/")))}</p>
                </Box>
                <Grid container justify="space-around" className={classes.icons}>
                    <IconButton
                        size="small"
                    >
                        <ChatBubbleIcon color="disabled" fontSize="small" />
                        {props.review.review_comments_count !== 0 && (
                            <p
                                className={classes.iconText}
                            >
                                {props.review.review_comments_count}
                            </p>
                        )}
                    </IconButton>
                    {currentUser?.like_reviews_id.includes(props.review.id) &&
                        <IconButton size="small" onClick={() => props.unlikeReview(props.review)}>
                            <FavoriteIcon
                                color="error"
                                fontSize="small"
                            />
                            {props.review.review_likes_count !== 0 && (
                                <p
                                    className={classes.iconText}
                                >
                                    {props.review.review_likes_count}
                                </p>
                            )}
                        </IconButton>
                    }
                    {!currentUser?.like_reviews_id.includes(props.review.id) &&
                        <IconButton size="small" onClick={() => props.likeReview(props.review)}>
                            <FavoriteIcon
                                color='action'
                                fontSize='small'
                            />
                            {props.review.review_likes_count !== 0 && (
                                <p
                                    className={classes.iconText}
                                >
                                    {props.review.review_likes_count}
                                </p>
                            )}
                        </IconButton>
                    }
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
                        <ShareIcon color="disabled" fontSize="small" />
                    </IconButton>
                </Grid>
                <Divider className={classes.cardDivider} />
            </Box>
            <ConfirmDeleteReview
                review={props.review}
                deleteReview={props.deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}