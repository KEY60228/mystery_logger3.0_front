import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
            padding: '8px',
        },
    })
)

export const SystemErrorPage: FC = () => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>システムエラーが発生しました</Card>
    )
}
