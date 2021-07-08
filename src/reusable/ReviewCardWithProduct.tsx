import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Grid, IconButton, Divider, Menu, MenuItem } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Rating } from '@material-ui/lab'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import FavoriteIcon from '@material-ui/icons/Favorite'
import RepeatIcon from '@material-ui/icons/Repeat'
import ShareIcon from '@material-ui/icons/Share'

import { Review, ReviewIndex, User } from '../@types'
import { formatDate } from '../util'

import { ProductImage } from './ProductImage'
import { UserImage } from './UserImage'
import { useSelector } from 'react-redux'
import { RootState } from '../stores'
import { ConfirmDeleteReview } from './ConfirmDeleteReview'

interface Props {
    review: ReviewIndex
    editReview: (review: Review) => void
    deleteReview: (review: Review) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    likeReview: (review: Review) => void
    unlikeReview: (review: Review) => void
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
            color: '#C0C0C0',
        },
        menuButton: {
            width: '48px',
            height: '48px',
        },
        leftBox: {
            margin: '8px 8px 0',
            flexGrow: 1,
            '&:hover': {
                cursor: 'pointer',
            },
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
        spoiledContents: {
            lineHeight: '16px',
            fontSize: '13px',
            color: theme.palette.error.main,
            margin: '8px 0 0',
            '&:hover': {
                cursor: 'pointer',
            }
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
            margin: '16px 0',
        },
    })
)

export const ReviewCardWithProduct: FC<Props> = props => {
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
        props.editReview(props.review)
    }

    return (
        <>
            <Grid container wrap='nowrap'>
                <UserImage
                    user={props.review.user}
                    className={{ height: '48px', width: '48px' }}
                />
                <Box className={classes.reviewerInfo}>
                    <p className={classes.reviewerName}>{props.review.user.name}</p>
                    <p className={classes.reviewerAccountId}>@{props.review.user.account_id}</p>
                </Box>
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
                    {currentUser?.account_id !== props.review.user.account_id &&
                        !currentUser?.follows_id.includes(props.review.user.id) && (
                            <MenuItem onClick={() => props.follow(props.review.user)}>
                                @{props.review.user.account_id}をフォローする
                            </MenuItem>
                        )
                    }
                    {currentUser?.account_id !== props.review.user.account_id &&
                        currentUser?.follows_id.includes(props.review.user.id) && (
                            <MenuItem onClick={() => props.unfollow(props.review.user)}>
                                @{props.review.user.account_id}のフォローを解除する
                            </MenuItem>
                        )
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
            <Grid container justify='space-between' wrap='nowrap'>
                <Box className={classes.leftBox} onClick={() => history.push(`/reviews/${props.review.id}`)}>
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
                    {!props.review.spoil &&
                        <p className={classes.reviewContents}>
                            {props.review.exposed_contents}
                        </p>
                    }
                    {props.review.spoil &&
                        <p
                            className={classes.spoiledContents}
                        >
                            ※ネタバレを表示する
                            <span dangerouslySetInnerHTML={{__html: '<!-- 見いたあなあああ！！！！ -->'}}></span>
                        </p>
                    }
                </Box>
                <Grid container direction='column' justify='space-between' className={classes.rightBox}>
                    <ProductImage
                        product={props.review.product}
                        className={{ height: '112px', width: '80px' }}
                    />
                    <p className={classes.reviewCreateDate}>{formatDate(new Date(props.review.created_at.replace(/-/g, "/")))}</p>
                </Grid>
            </Grid>
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
            <Divider className={classes.divider} />
            <ConfirmDeleteReview
                review={props.review}
                deleteReview={props.deleteReview}
                confirmOpen={confirmOpen}
                setConfirmOpen={setConfirmOpen}
            />
        </>
    )
}