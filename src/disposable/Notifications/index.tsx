import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
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

    return (
        <>
            <Helmet>
                <title>通知一覧 - なぞログ</title>
            </Helmet>
            <Card className={classes.card}>まだ通知はありません</Card>
        </>
    )
}
