import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, CardMedia, Grid, Typography, Button } from '@material-ui/core'

import { User } from '../../../../@types'
import { RootState } from '../../../../stores/index'
import { FollowButton } from '../../../molecules/FollowButton'
import { UserCounters } from './UserCounters'

interface Props {
    user: User
    follow: (user: User) => void
    unfollow: (user: User) => void
    edit: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
        media: {
            height: '72px',
            width: '72px',
            border: '1px solid grey',
            borderRadius: '50%',
            margin: '8px',
            backgroundSize: 'contain',
        },
        userName: {
            fontSize: '16px',
            marginLeft: '20px',
        },
        userId: {
            color: 'grey',
            fontSize: '12px',
            marginLeft: '8px',
        },
        button: {
            fontSize: '12px',
            width: '150px',
            marginRight: '20px',
        },
        profile: {
            fontSize: '12px',
            margin: '20px',
        },
    }),
)

export const UserProfile: FC<Props> = ({ user, follow, unfollow, edit }) => {
    const classes = useStyles()
    const currentUser = useSelector((state: RootState) => state.auth.user)

    return (
        <Card className={classes.root}>
            <Grid container justify="space-around" alignItems="center">
                <CardMedia
                    image={`/user_img/${user.image_name}`}
                    className={classes.media}
                />
                <UserCounters user={user} />
            </Grid>
            <Grid
                container
                justify="space-around"
                alignItems="center"
                wrap="nowrap"
            >
                <Grid container alignItems="center">
                    <Typography
                        variant="subtitle1"
                        className={classes.userName}
                    >
                        {user.name}
                    </Typography>
                    <Typography variant="body1" className={classes.userId}>
                        @{user.account_id}
                    </Typography>
                </Grid>
                {user.account_id === currentUser?.account_id && (
                    <Button onClick={edit}>設定</Button>
                )}
                {(currentUser && user.account_id !== currentUser?.account_id) && (
                    <FollowButton
                        currentUser={currentUser}
                        user={user}
                        follow={follow}
                        unfollow={unfollow}
                    />
                )}
            </Grid>
            <Typography variant="body1" className={classes.profile}>
                {user.profile}
            </Typography>
        </Card>
    )
}