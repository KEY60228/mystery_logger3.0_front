import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Box, Button, Divider } from '@material-ui/core'

import { User } from '../../../@types'
import { RootState } from '../../../stores/'
import { UserImage } from '../../../reusable/UserImage'

interface Props {
    user: User
    follow: (user: User) => void
    unfollow: (user: User) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
        },
        userName: {
            margin: '0 0 0 8px',
            lineHeight: '16px',
            fontSize: '15px',
            flexGrow: 1,
        },
        userAccount: {
            margin: '0 0 0 8px',
            lineHeight: '16px',
            fontSize: '12px',
            color: '#C0C0C0',
            flexGrow: 1,
        },
        followButton: {
            minHeight: '32px',
            height: '32px',
            minWidth: '100px',
            margin: 'auto',
            padding: '0',
            borderRadius: '10px',
        },
        followButtonLabel: {
            margin: '0',
            lineHeight: "24px",
            fontSize: '13px',
            fontWeight: 'bold',
        },
        userProfile: {
            lineHeight: '24px',
            fontSize: '14px',
            margin: '8px 0 0 8px',
        },
        divider: {
            margin: '16px 0',
        },
    })
)

export const UserCard: FC<Props> = props => {
    const classes = useStyles()

    const currentUser = useSelector((state: RootState) => state.auth.user)

    return (
        <Box className={classes.root}>
            <Grid container wrap='nowrap'>
                <UserImage
                    user={props.user}
                    className={{ height: '48px', width: '48px' }}
                />
                <Grid container direction='column'>
                    <Grid container wrap='nowrap'>
                        <Grid container direction='column'>
                            <p className={classes.userName}>{props.user.name}</p>
                            <p className={classes.userAccount}>@{props.user.account_id}</p>
                        </Grid>
                        {currentUser?.account_id !== props.user.account_id &&
                            <>
                                {!currentUser?.follows_id.includes(props.user.id) &&
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className={classes.followButton}
                                        onClick={() => props.follow(props.user)}
                                    >
                                        <p className={classes.followButtonLabel}>フォロー</p>
                                    </Button>
                                }
                                {currentUser?.follows_id.includes(props.user.id) &&
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        className={classes.followButton}
                                        onClick={() => props.unfollow(props.user)}
                                    >
                                        <p className={classes.followButtonLabel}>フォロー解除</p>
                                    </Button>
                                }
                            </>
                        }
                    </Grid>
                    <p className={classes.userProfile}>{props.user.profile}</p>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
        </Box>
    )
}