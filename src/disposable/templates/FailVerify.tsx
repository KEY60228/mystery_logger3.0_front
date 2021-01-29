import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export const FailVerify: FC = () => {
    const classes = useStyles()

    return <Typography>認証に失敗しました</Typography>
}
