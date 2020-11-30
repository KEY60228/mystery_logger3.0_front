import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { User } from '../../@types'

interface Props {
    currentUser: User
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

export const FollowButton: FC<Props> = ({
    currentUser,
    user,
    follow,
    unfollow,
    className,
}) => {
    const classes = useStyles(className)

    return (
        <>
            {currentUser.follows_id.includes(user.id) && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => unfollow(user)}
                    className={classes.root}
                >
                    フォロー解除
                </Button>
            )}
            {!currentUser.follows_id.includes(user.id) && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => follow(user)}
                    className={classes.root}
                >
                    フォロー
                </Button>
            )}
        </>
    )
}
