import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import StarRateIcon from '@material-ui/icons/StarRate'

import { Product } from '../../@types'

interface Props {
    product: Product
    className?: ClassProps
}

interface ClassProps {
    width?: string
    fontSize?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            width: className.width,
        }),
        text: (className: ClassProps) => ({
            fontSize: className.fontSize || '10px',
        }),
    }),
)

export const ProductCounters: FC<Props> = props => {
    const classes = useStyles(props.className)

    return (
        <Grid
            container
            justify="space-around"
            alignItems="center"
            wrap="nowrap"
            className={classes.root}
        >
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <DirectionsRunIcon color="primary" fontSize="small" />
                <Typography variant="caption" className={classes.text}>
                    {props.product.reviews_count}
                </Typography>
            </Grid>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <EqualizerIcon color="primary" fontSize="small" />
                <Typography variant="caption" className={classes.text}>
                    {props.product.success_rate
                        ? `${(props.product.success_rate * 100).toFixed(1)}%`
                        : '-'}
                </Typography>
            </Grid>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.root}
            >
                <StarRateIcon color="primary" fontSize="small" />
                <Typography variant="caption" className={classes.text}>
                    {props.product.avg_rating
                        ? props.product.avg_rating.toFixed(1)
                        : '-'}
                </Typography>
            </Grid>
        </Grid>
    )
}
