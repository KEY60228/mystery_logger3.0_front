import React, { FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import HistoryIcon from '@material-ui/icons/History'
import SearchIcon from '@material-ui/icons/Search'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import NotificationsIcon from '@material-ui/icons/Notifications'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import PersonIcon from '@material-ui/icons/Person'

import { RootState } from '../../stores/index'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            width: '100%',
            left: 0,
            bottom: 0,
        },
    }),
)

export const BottomNav: FC = () => {
    const classes = useStyles()
    const location = useLocation()
    const [value, setValue] = useState<string>('')

    const isLogin = useSelector((state: RootState) => !!state.auth.user)
    const userName = useSelector((state: RootState) =>
        state.auth.user ? state.auth.user.name : '',
    )
    const userId = useSelector((state: RootState) =>
        state.auth.user ? state.auth.user.account_id : '',
    )

    useEffect(() => {
        setValue(location.pathname)
    }, [location.pathname])

    return (
        <BottomNavigation
            value={value}
            onChange={(ev, newValue) => setValue(newValue)}
            showLabels
            className={classes.root}
        >
            {!isLogin && (
                <BottomNavigationAction
                    component={Link}
                    to={'/'}
                    value="/"
                    label="Top"
                    icon={<HomeIcon />}
                />
            )}
            {isLogin && (
                <BottomNavigationAction
                    component={Link}
                    to={'/timeline'}
                    value="/timeline"
                    label="Timeline"
                    icon={<HistoryIcon />}
                />
            )}
            <BottomNavigationAction
                component={Link}
                to={'/search'}
                value="/search"
                label="Search"
                icon={<SearchIcon />}
            />
            <BottomNavigationAction
                component={Link}
                to={'/accompany'}
                value="/accompany"
                label="Accompany"
                icon={<EmojiPeopleIcon />}
            />
            {!isLogin && (
                <BottomNavigationAction
                    component={Link}
                    to={'/preregister'}
                    value="/preregister"
                    label="Sign up"
                    icon={<HowToRegIcon />}
                />
            )}
            {isLogin && (
                <BottomNavigationAction
                    component={Link}
                    to={'/notifications'}
                    value="/notifications"
                    label="Notifications"
                    icon={<NotificationsIcon />}
                />
            )}
            {!isLogin && (
                <BottomNavigationAction
                    component={Link}
                    to={`/login`}
                    value="/login"
                    label="Login"
                    icon={<LockOpenIcon />}
                />
            )}
            {isLogin && (
                <BottomNavigationAction
                    component={Link}
                    to={`/users/${userId}`}
                    value={`/users/${userId}`}
                    label={`${userName}`}
                    icon={<PersonIcon />}
                />
            )}
        </BottomNavigation>
    )
}
