import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { Product } from '../../@types'
import { ProductCard } from './ProductCard'

interface Props {
    products: Product[] | null
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            overflowX: 'scroll',
            width: className.width,
        }),
        innerBox: {
            display: 'inline-block',
            whiteSpace: 'nowrap',
        },
    }),
)

export const LinedProducts: FC<Props> = ({ products, className }) => {
    const classes = useStyles(className)

    return (
        <Box className={classes.root}>
            <Box className={classes.innerBox}>
                {products?.map((product: Product) => (
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
    )
}
