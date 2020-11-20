import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid } from '@material-ui/core'

import { User } from '../../../../@types'
import { SuccessRateByCategory as CategoryStatics } from './SuccessRateByCategory'

interface Props {
    user?: User // 仮
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
    }),
)

export const UserStatics: FC<Props> = () => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <CategoryStatics />
            </Grid>
        </Card>
    )
}
