import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import { User } from '../../../../@types'

interface Props {
    user: User
    setFollowsOpen: (value: boolean) => void
    setFollowerOpen: (value: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '250px',
        },
        subtitle: {
            fontSize: '12px',
        },
        text: {
            fontWeight: 'bold',
        },
    }),
)

export const UserCounters: FC<Props> = ({
    user,
    setFollowsOpen,
    setFollowerOpen,
}) => {
    const classes = useStyles()

    return (
        <Grid container direction="row" wrap="nowrap" className={classes.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                onClick={() => setFollowsOpen(true)} // 仮
            >
                <Typography variant="body1" className={classes.text}>
                    {user.follows_count || 0}
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    フォロー
                </Typography>
            </Grid>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                onClick={() => setFollowerOpen(true)} // 仮
            >
                <Typography variant="body1" className={classes.text}>
                    {user.followers_count || 0}
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    フォロワー
                </Typography>
            </Grid>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Typography variant="body1" className={classes.text}>
                    {user.success_rate
                        ? `${(user.success_rate * 100).toFixed(1)}%`
                        : '-'}
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    成功率
                </Typography>
            </Grid>
        </Grid>
    )
}
