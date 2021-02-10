import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { CurrentUser, User } from '../@types'

interface Props {
    currentUser: CurrentUser
    user: User
    follow: (user: User) => void
    unfollow: (user: User) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            whiteSpace: 'nowrap',
        },
    }),
)

export const FollowButton: FC<Props> = props => {
    const classes = useStyles(props.className)

    return (
        <>
            {props.currentUser.follows_id.includes(props.user.id) && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.unfollow(props.user)}
                    className={classes.root}
                >
                    フォロー解除
                </Button>
            )}
            {!props.currentUser.follows_id.includes(props.user.id) && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.follow(props.user)}
                    className={classes.root}
                >
                    フォロー
                </Button>
            )}
        </>
    )
}
