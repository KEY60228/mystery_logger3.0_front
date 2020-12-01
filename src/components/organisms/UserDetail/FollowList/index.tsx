import React, { FC, forwardRef, ReactElement, Ref } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TransitionProps } from '@material-ui/core/transitions'
import {
    Dialog,
    AppBar,
    Toolbar,
    Slide,
    IconButton,
    Typography,
    Card,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { User } from '../../../../@types'
import { FollowCard } from './FollowCard'

interface Props {
    follows: User[] | null
    label: string
    open: boolean
    setOpen: (value: boolean) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        card: {
            margin: '8px',
        },
        icon: {
            position: 'absolute',
        },
        title: {
            width: '100%',
            textAlign: 'center',
        },
    }),
)

const Transition = forwardRef(
    (
        props: TransitionProps & { children?: ReactElement },
        ref: Ref<unknown>,
    ) => {
        return <Slide direction="up" ref={ref} {...props} />
    },
)

export const FollowList: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={() => props.setOpen(false)}
            TransitionComponent={Transition}
        >
            <AppBar color="primary" position="static">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={() => props.setOpen(false)}
                        className={classes.icon}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.label}
                    </Typography>
                </Toolbar>
            </AppBar>
            {props.follows &&
                props.follows.map((followUser: User) => (
                    <FollowCard
                        key={followUser.id}
                        followUser={followUser}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        setOpen={props.setOpen}
                    />
                ))}
            {!props.follows?.length && (
                <Card className={classes.card}>
                    <Typography>まだ{props.label}はいません</Typography>
                </Card>
            )}
        </Dialog>
    )
}
