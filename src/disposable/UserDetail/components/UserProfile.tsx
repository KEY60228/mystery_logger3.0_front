import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Button, IconButton } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { UserDetail } from '../../../@types'

interface Props {
    user: UserDetail
}

const useStyles = makeStyles(() =>
    createStyles({
        userBox: {
            marginLeft: '16px',
        },
        userImage: {
            height: '88px',
            width: '88px',
            borderRadius: '50%',
        },
        userProperty: {
            lineHeight: '24px',
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0',
            textAlign: 'center',
        },
        userPropertyLabel: {
            lineHeight: '16px',
            fontSize: '12px',
            margin: '0',
            textAlign: 'center',
        },
        buttons: {
            marginTop: '16px',
        },
        followButton: {
            minHeight: '32px',
            marginRight: '16px',
            borderRadius: '10px',
            flexGrow: 1,
            padding: 0,
        },
        followButtonLabel: {
            margin: '0',
            lineHeight: '24px',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        menuButton: {
            height: '32px',
            width: '32px',
        },
        userName: {
            margin: '16px 0 0',
            lineHeight: '24px',
            fontSize: '15px',
        },
        userAccountId: {
            margin: '0',
            lineHeight: '16px',
            fontSize: '12px',
            color: '#C0C0C0',
        },
        userProfile: {
            lineHeight: '16px',
            fontSize: '12px',
            margin: '8px 8px 0',
        },
    })
)

export const UserProfile: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <Grid container wrap='nowrap'>
                <img
                    src={`${process.env.API_BASEURL}${props.user.image_name}`}
                    className={classes.userImage}
                />
                <Grid container direction='column' className={classes.userBox}>
                    <Grid container justify='space-between' wrap='nowrap'>
                        <Grid container direction='column'>
                            <p className={classes.userProperty}>{props.user.follows_count}</p>
                            <p className={classes.userPropertyLabel}>フォロー</p>
                        </Grid>
                        <Grid container direction='column'>
                            <p className={classes.userProperty}>{props.user.followers_count}</p>
                            <p className={classes.userPropertyLabel}>フォロワー</p>
                        </Grid>
                        <Grid container direction='column'>
                            <p className={classes.userProperty}>
                                {props.user.success_rate
                                    ? `${(props.user.success_rate * 100).toFixed(1)}%`
                                    : '-'
                                }
                            </p>
                            <p className={classes.userPropertyLabel}>成功率</p>
                        </Grid>
                    </Grid>
                    <Grid container wrap='nowrap' className={classes.buttons}>
                        <Button variant='contained' color='primary' className={classes.followButton}>
                            <p className={classes.followButtonLabel}>フォロー</p>
                        </Button>
                        <IconButton className={classes.menuButton}>
                            <MoreHorizIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <p className={classes.userName}>{props.user.name}</p>
            <p className={classes.userAccountId}>@{props.user.account_id}</p>
            <p className={classes.userProfile}>{props.user.profile}</p>
        </>
    )
}