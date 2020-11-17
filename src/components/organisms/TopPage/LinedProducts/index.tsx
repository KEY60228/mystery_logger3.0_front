import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import { Product } from '../../../../@types'
import { Products } from './Products'

interface Props {
    products: Product[] | null
    subtitle: string
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        subtitle: {
            width: '100%',
            backgroundColor: 'gainsboro',
        },
    }),
)

export const LinedProducts: FC<Props> = ({ products, subtitle, className }) => {
    const classes = useStyles(className)

    return (
        <>
            <Typography className={classes.subtitle}>{subtitle}</Typography>
            <Products products={products} />
        </>
    )
}
