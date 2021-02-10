import React, { FC, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider } from '@material-ui/core'

import { UserDetail } from '../../@types'
import { UserProfile } from './components/UserProfile'
import { UserStatics } from './components/UserStatics'
import { UserTabs } from './components/UserTabs'
import { Footer } from '../../reusable/Footer'


interface Props {
    user: UserDetail
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '16px 20px 24px',
        },
        divider: {
            marginTop: '16px',
        },
        staticDivider: {
            margin: '24px 0',
        },
        lastDivider: {
            margin: '40px 0',
        },
    })
)

export const UserDetailTemplate: FC<Props> = props => {
    const classes = useStyles()


    return (
        <>
            <Box className={classes.root}>
                <UserProfile user={props.user} />
                <Divider className={classes.divider} />
                <UserStatics user={props.user} />
                <Divider className={classes.staticDivider} />
                <UserTabs user={props.user} />
                <Divider className={classes.lastDivider} />
            </Box>
            <Footer />
        </>
    )
}