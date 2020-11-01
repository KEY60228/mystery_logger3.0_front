import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { Product } from '../../@types'
import { DoneCounter } from '../atoms/DoneCounter'
import { SuccessRateCounter } from '../atoms/SuccessRateCounter'
import { RatingCounter } from '../atoms/RatingCounter'

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
            <DoneCounter
                number={product.reviews_count}
                className={{ fontSize: '10px' }}
                iconSize="small"
            />
            <SuccessRateCounter
                number={
                    product.success_rate
                        ? `${(product.success_rate * 100).toFixed(1)}%`
                        : '-'
                }
                className={{ fontSize: '10px' }}
                iconSize="small"
            />
            <RatingCounter
                number={
                    product.avg_rating ? product.avg_rating.toFixed(1) : '-'
                }
                className={{ fontSize: '10px' }}
                iconSize="small"
            />
        </Grid>
    )
}
