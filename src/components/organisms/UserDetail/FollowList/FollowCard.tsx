import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, CardMedia, Typography } from '@material-ui/core'

import { User } from '../../../../@types'
import { RootState } from '../../../../stores/index'
import { FollowButton } from '../../../molecules/FollowButton'

interface Props {
    followUser: User
    follow: (user: User) => void
    unfollow: (user: User) => void
    setOpen: (value: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
            padding: '8px',
        },
        media: {
            height: '72px',
            minWidth: '72px',
            border: '1px solid grey',
            borderRadius: '50%',
            margin: '8px',
            backgroundSize: 'contain',
        },
        userName: {
            fontSize: '16px',
            marginLeft: '4px',
        },
        userId: {
            color: 'grey',
            fontSize: '12px',
            marginLeft: '4px',
        },
        profile: {
            fontSize: '12px',
            marginTop: '8px',
            marginLeft: '4px',
        },
    }),
)

export const FollowCard: FC<Props> = ({
    followUser,
    follow,
    unfollow,
    setOpen,
}) => {
    const classes = useStyles()
    const history = useHistory()

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const onClick = () => {
        history.push(`/users/${followUser.account_id}`)
        setOpen(false)
    }

    return (
        <Card className={classes.root}>
            <Grid container wrap="nowrap">
                <CardMedia
                    image={`/user_img/${followUser.image_name}`}
                    onClick={onClick}
                    className={classes.media}
                />
                <Grid container direction="column">
                    <Grid
                        container
                        justify="space-around"
                        alignItems="center"
                        wrap="nowrap"
                    >
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            onClick={onClick}
                        >
                            <Typography
                                variant="subtitle1"
                                className={classes.userName}
                            >
                                {followUser.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                className={classes.userId}
                            >
                                @{followUser.account_id}
                            </Typography>
                        </Grid>
                        {currentUser &&
                            followUser.account_id !==
                                currentUser?.account_id && (
                                <FollowButton
                                    currentUser={currentUser}
                                    user={followUser}
                                    follow={follow}
                                    unfollow={unfollow}
                                />
                            )}
                    </Grid>
                    <Typography variant="body1" className={classes.profile}>
                        {followUser.profile}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}
