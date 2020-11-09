import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Box, Grid, Typography } from '@material-ui/core'

import { Product, ProductDetail, User } from '../../../@types'
import { Ratings } from '../../molecules/Ratings'
import { Buttons } from './Buttons'
import { ProductProfile } from './ProductProfile'

interface Props {
    product: ProductDetail
    currentUser: User | null
    setModalOpen: (value: boolean) => void
    setIsNew: (value: boolean) => void
    wanna: (product: Product) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
        box: {
            marginTop: '12px',
            marginLeft: '12px',
        },
        media: {
            height: '240px',
            backgroundSize: 'contain',
            margin: '6px',
        },
        button: {
            margin: '8px',
        },
    }),
)

export const ProductContents: FC<Props> = ({
    product,
    currentUser,
    setModalOpen,
    setIsNew,
    wanna,
    className,
}) => {
    const classes = useStyles(className)

    return (
        <Card className={classes.root}>
            <Box className={classes.box}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="subtitle1">{product.contents}</Typography>
            </Box>
            <Grid container direction="row" wrap="nowrap">
                <Grid>
                    <img
                        className={classes.media}
                        src={`/product_img/${product.image_name}`}
                        alt={product.name}
                    />
                    <Ratings
                        number={product.avg_rating || 0}
                        size="medium"
                        className={{ marginLeft: '4px' }}
                    />
                    <Buttons
                        product={product}
                        currentUser={currentUser}
                        setModalOpen={setModalOpen}
                        setIsNew={setIsNew}
                        wanna={wanna}
                    />
                </Grid>
                <ProductProfile product={product} />
            </Grid>
        </Card>
    )
}