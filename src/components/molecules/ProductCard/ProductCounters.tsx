import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import StarRateIcon from '@material-ui/icons/StarRate'

import { Product } from '../../../@types'

interface Props {
    product: Product
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            width: className.width,
        }),
        text: (className: ClassProps) => ({
            fontSize: '10px',
        }),
    }),
)

export const ProductCounters: FC<Props> = ({ product, className }) => {
    const classes = useStyles(className)

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
                    {product.reviews_count}
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
                    {product.success_rate
                        ? `${(product.success_rate * 100).toFixed(1)}%`
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
                    {product.avg_rating ? product.avg_rating.toFixed(1) : '-'}
                </Typography>
            </Grid>
        </Grid>
    )
}
