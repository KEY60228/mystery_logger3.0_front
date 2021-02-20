import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Box, Button, Divider } from '@material-ui/core'

import { User } from '../../../@types'
import { UserImage } from '../../../reusable/UserImage'

interface Props {
    user: User
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
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.followButton}
                        >
                            <p className={classes.followButtonLabel}>フォロー</p>
                        </Button>
                    </Grid>
                    <p className={classes.userProfile}>{props.user.profile}</p>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
        </Box>
    )
}