import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        card: {
            margin: '8px',
            padding: '8px',
        },
    }),
)

export const Notifications: FC = () => {
    const classes = useStyles()

    return <Card className={classes.card}>まだ通知はありません</Card>
}
