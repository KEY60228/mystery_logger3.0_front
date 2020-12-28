import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { LinearProgress } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    }),
)

export const LinearLoader: FC = () => {
    const classes = useStyles()

    return <LinearProgress />
}
