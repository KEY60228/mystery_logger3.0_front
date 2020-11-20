import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'

import { Product } from '../../../@types'
import { ProductCard } from '../../molecules/ProductCard/'

interface Props {
    products: Product[]
    subtitle: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        subtitle: {
            width: '100%',
            backgroundColor: 'gainsboro',
        },
        outerBox: {
            overflowX: 'scroll',
        },
        innerBox: {
            display: 'inline-block',
            whiteSpace: 'nowrap',
        },
    }),
)

export const LinedProducts: FC<Props> = ({ products, subtitle }) => {
    const classes = useStyles()

    return (
        <>
            <Typography className={classes.subtitle}>{subtitle}</Typography>
            <Box className={classes.outerBox}>
                <Box className={classes.innerBox}>
                    {products.map((product: Product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            className={{
                                rootWidth: '100px',
                                mediaHeight: '150px',
                                display: 'inline-block',
                                whiteSpace: 'normal',
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </>
    )
}
