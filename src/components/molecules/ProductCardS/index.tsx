import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardMedia } from '@material-ui/core'

import { Product } from '../../../@types'
import { ProductCounters } from './ProductCounters'

interface Props {
    product: Product
    className?: ClassProps
}

interface ClassProps {
    rootWidth?: string
    mediaHeight?: string
    whiteSpace?: 'normal'
    display?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            display: className.display,
            whiteSpace: className.whiteSpace,
            minWidth: className.rootWidth || '100px',
            margin: '4px',
        }),
        media: (className: ClassProps) => ({
            backgroundSize: 'contain',
            height: className.mediaHeight || '150px',
        }),
    }),
)

export const ProductCardS: FC<Props> = props => {
    const classes = useStyles(props.className)

    return (
        <Card className={classes.root}>
            <CardActionArea
                component={Link}
                to={`/products/${props.product.id}`}
            >
                <CardMedia
                    className={classes.media}
                    image={`${process.env.API_BASEURL}${props.product.image_name}`}
                />
                <ProductCounters
                    product={props.product}
                    className={{ width: props.className?.rootWidth }}
                />
            </CardActionArea>
        </Card>
    )
}
