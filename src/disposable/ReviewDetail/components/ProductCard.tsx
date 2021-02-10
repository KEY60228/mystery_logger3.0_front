import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Box } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

import { Product, Category, Organizer, Performance, Venue } from '../../../@types'
import { ProductImage } from '../../../reusable/ProductImage'

interface PerformanceWithVenue extends Performance {
    venue: Venue
}

interface ExtendsProduct extends Product {
    category: Category
    organizer: Organizer
    performances: PerformanceWithVenue[] 
}

interface Props {
    product: ExtendsProduct
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {

        },
        productDetail: {
            flexGrow: 1,
        },
        productTitle: {
            lineHeight: '24px',
            fontSize: '16px',
            margin: '0',
        },
        organizer: {
            lineHeight: '16px',
            fontSize: '10px',
            margin: '0',
            textAlign: 'right',
        },
        providedBy: {
            color: '#C0C0C0',
            marginRight: '4px',
        },
        productPropertyLabels: {
            marginRight: '16px',
        },
        productPropertyLabel: {
            lineHeight: '16px',
            fontSize: '10px',
            color: '#C0C0C0',
            margin: '0',
        },
        productProperty: {
            lineHeight: '16px',
            fontSize: '10px',
            margin: '0',
        },
        ratings: {
            marginTop: '6px',
        },
        ratingLabel: {
            margin: '0 8px',
        },
    })
)

export const ProductCard: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Grid container wrap='nowrap'>
            <ProductImage
                product={props.product}
                className={{ height: '112px', width: '80px', margin: '0 8px' }}
            />
            <Box className={classes.productDetail}>
                <p className={classes.productTitle}>{props.product.name}</p>
                <p className={classes.organizer}><span className={classes.providedBy}>Provided by</span>{props.product.organizer.service_name}</p>
                <Grid container>
                    <Box className={classes.productPropertyLabels}>
                        <p className={classes.productPropertyLabel}>カテゴリ:</p>
                        <p className={classes.productPropertyLabel}>投稿数:</p>
                        <p className={classes.productPropertyLabel}>脱出成功率:</p>
                    </Box>
                    <Box>
                        <p className={classes.productProperty}>{props.product.category.name}</p>
                        <p className={classes.productProperty}>{props.product.reviews_count}</p>
                        <p className={classes.productProperty}>{props.product.success_rate} ({props.product.success_count}/{props.product.reviews_count - props.product.na_count})</p>
                    </Box>
                </Grid>
                <Grid container alignItems='center' className={classes.ratings}>
                    <Rating
                        value={
                            props.product.avg_rating === 0 || props.product.avg_rating === null ? 0 : parseFloat(props.product.avg_rating.toFixed(1))
                        }
                        precision={0.1}
                        readOnly
                        size='small'
                    />
                    <p className={classes.ratingLabel}>{props.product.avg_rating === 0 || props.product.avg_rating === null ? '-' : props.product.avg_rating.toFixed(1)}</p>
                </Grid>
            </Box>
        </Grid>
    )
}