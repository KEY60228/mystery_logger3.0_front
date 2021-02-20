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
    Box,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { User } from '../../../@types'
import { UserCard } from './UserCard'

interface Props {
    users: User[] | null
    label: string
    open: boolean
    setOpen: (value: boolean) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        header: {
            height: '64px',
        },
        toolbar: {
            padding: '0 20px',
            height: '64px',
        },
        closeIcon: {
            position: 'absolute',
            width: '32px',
            height: '32px',
            padding: '0',
        },
        title: {
            lineHeight: '24px',
            fontSize: '16px',
            margin: '0 8px',
            flexGrow: 1,
            textAlign: 'center',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        userList: {
            margin: '16px 20px',
        },
        noOne: {
            lineHeight: '24px',
            fontSize: '15px',
            fontWeight: 'bold',
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
            <AppBar
                color="secondary"
                position="static"
                className={classes.header}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="primary"
                        onClick={() => props.setOpen(false)}
                        className={classes.closeIcon}
                    >
                        <CloseIcon />
                    </IconButton>
                    <p className={classes.title}>
                        {props.label}
                    </p>
                </Toolbar>
            </AppBar>
            <Box className={classes.userList}>
                {props.users &&
                    props.users.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                {!props.users?.length && (
                    <p className={classes.noOne}>まだ{props.label}はいません</p>
                )}
            </Box>
        </Dialog>
    )
}
