import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography } from '@material-ui/core'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import QueueIcon from '@material-ui/icons/Queue'

import { ProductDetail } from '../../../@types'

interface Props {
    product: ProductDetail
    setModalOpen: (value: boolean) => void
    setIsNew: (value: boolean) => void
    wanna: boolean
    setWanna: (value: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: '8px',
        },
    }),
)

export const Buttons: FC<Props> = ({
    product,
    setModalOpen,
    setIsNew,
    wanna,
    setWanna,
}) => {
    const classes = useStyles()

    const onClick = () => {
        setIsNew(true)
        setModalOpen(true)
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Button
                variant="contained"
                color="primary"
                onClick={onClick}
                className={classes.button}
            >
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <DirectionsRunIcon />
                    <Typography variant="caption">
                        {product.reviews_count}
                    </Typography>
                </Grid>
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setWanna(!wanna)}
                className={classes.button}
            >
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <QueueIcon />
                    <Typography variant="caption">{800 /* 仮 */}</Typography>
                </Grid>
            </Button>
        </Grid>
    )
}
