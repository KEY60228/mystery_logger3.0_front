import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'

import { ProductIndex } from '../../../@types'
import { ProductCardS } from '../../molecules/ProductCardS/'

interface Props {
    products: ProductIndex[]
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

export const LinedProducts: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <Typography className={classes.subtitle}>
                {props.subtitle}
            </Typography>
            <Box className={classes.outerBox}>
                <Box className={classes.innerBox}>
                    {props.products.map((product: ProductIndex) => (
                        <ProductCardS
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
