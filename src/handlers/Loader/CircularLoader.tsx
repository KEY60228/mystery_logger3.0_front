import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100vh',
        },
    }),
)

export const CircularLoader: FC = () => {
    const classes = useStyles()

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <CircularProgress size={100} />
        </Grid>
    )
}
