import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { UserDetail, User } from '../../../@types'
import { RootState } from '../../../stores/'
import { UserImage } from '../../../reusable/UserImage'

interface Props {
    user: UserDetail
    setFollowsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setFollowersOpen: React.Dispatch<React.SetStateAction<boolean>>
    editUser: () => void
    follow: (user: User) => void
    unfollow: (user: User) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        userBox: {
            marginLeft: '16px',
        },
        userImage: {
            height: '88px',
            width: '88px',
            borderRadius: '50%',
        },
        userProperty: {
            lineHeight: '24px',
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0',
            textAlign: 'center',
        },
        userPropertyLabel: {
            lineHeight: '16px',
            fontSize: '12px',
            margin: '0',
            textAlign: 'center',
        },
        buttons: {
            marginTop: '16px',
        },
        followButton: {
            minHeight: '32px',
            marginRight: '16px',
            borderRadius: '10px',
            flexGrow: 1,
            padding: 0,
        },
        followButtonLabel: {
            margin: '0',
            lineHeight: '24px',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        menuButton: {
            height: '32px',
            width: '32px',
        },
        userName: {
            margin: '16px 0 0',
            lineHeight: '24px',
            fontSize: '15px',
        },
        userAccountId: {
            margin: '0',
            lineHeight: '16px',
            fontSize: '12px',
            color: '#C0C0C0',
        },
        userProfile: {
            lineHeight: '16px',
            fontSize: '12px',
            margin: '8px 8px 0',
        },
    })
)

export const UserProfile: FC<Props> = props => {
    const classes = useStyles()

    // ログインユーザー
    const currentUser = useSelector((state: RootState) => state.auth.user)

    // メニューの開閉
    const [menu, setMenu] = useState<null | HTMLElement>(null)
    const openMenu = (ev: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(ev.currentTarget)
    }

    return (
        <>
            <Grid container wrap='nowrap'>
                <UserImage
                    user={props.user}
                    transition={false}
                    className={{ height: '88px', width: '88px' }}
                />
                <Grid container direction='column' className={classes.userBox}>
                    <Grid container justify='space-between' wrap='nowrap'>
                        <Grid container direction='column' onClick={() => props.setFollowsOpen(true)}>
                            <p className={classes.userProperty}>{props.user.follows_count}</p>
                            <p className={classes.userPropertyLabel}>フォロー</p>
                        </Grid>
                        <Grid container direction='column' onClick={() => props.setFollowersOpen(true)}>
                            <p className={classes.userProperty}>{props.user.followers_count}</p>
                            <p className={classes.userPropertyLabel}>フォロワー</p>
                        </Grid>
                        <Grid container direction='column'>
                            <p className={classes.userProperty}>
                                {props.user.success_rate
                                    ? `${(props.user.success_rate * 100).toFixed(1)}%`
                                    : '-'
                                }
                            </p>
                            <p className={classes.userPropertyLabel}>成功率</p>
                        </Grid>
                    </Grid>
                    <Grid container wrap='nowrap' className={classes.buttons}>
                        {currentUser?.account_id !== props.user.account_id &&
                            <>
                                {!currentUser?.follows_id.includes(props.user.id) &&
                                    <Button variant='contained' color='primary' onClick={() => props.follow(props.user)} className={classes.followButton}>
                                        <p className={classes.followButtonLabel}>フォロー</p>
                                    </Button>
                                }
                                {currentUser?.follows_id.includes(props.user.id) &&
                                    <Button variant='outlined' color='primary' onClick={() => props.unfollow(props.user)} className={classes.followButton}>
                                        <p className={classes.followButtonLabel}>フォロー解除</p>
                                    </Button>
                                }
                                <IconButton onClick={openMenu} className={classes.menuButton}>
                                    <MoreHorizIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={menu}
                                    open={Boolean(menu)}
                                    onClose={() => setMenu(null)}
                                >
                                    <MenuItem>このユーザーをブロックする</MenuItem>
                                    <MenuItem>このユーザーを通報する</MenuItem>
                                </Menu>
                            </>
                        }
                        {currentUser?.account_id === props.user.account_id &&
                            <Button variant='contained' color='primary' onClick={props.editUser} className={classes.followButton}>
                                <p className={classes.followButtonLabel}>プロフィールを変更する</p>
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <p className={classes.userName}>{props.user.name}</p>
            <p className={classes.userAccountId}>@{props.user.account_id}</p>
            <p className={classes.userProfile}>{props.user.profile}</p>
        </>
    )
}