import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import { Product } from '../../../@types'
import { ProductCard } from '../../molecules/ProductCard/index'

interface Props {
    products: Product[] | null
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '&::after': {
                content: '',
                flex: 'auto',
            },
        },
    }),
)

export const ListedProducts: FC<Props> = ({ products, className }) => {
    const classes = useStyles(className)

    return (
        <Grid container justify="space-between" className={classes.root}>
            {products &&
                products.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
        </Grid>
    )
}
