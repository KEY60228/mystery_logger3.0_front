import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    Card,
    CardMedia,
    CardActionArea,
    Grid,
    Box,
    Typography,
} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import {
    ProductDetailWithoutReviews,
    PerformanceWithVenue,
} from '../../../@types'
import { Ratings } from '../Ratings'

interface Props {
    product: ProductDetailWithoutReviews
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
        img: {
            minWidth: '80px',
            height: '120px',
            backgroundSize: 'contain',
            margin: '8px',
        },
        profile: {
            margin: '8px',
        },
        box: {
            margin: '8px 0',
        },
        text: {
            fontSize: '10px',
        },
    }),
)

export const ProductCardM: FC<Props> = ({ product }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea component={Link} to={`/products/${product.id}`}>
                <Grid container wrap="nowrap" alignItems="center">
                    <CardMedia
                        image={`/product_img/${product.image_name}`}
                        className={classes.img}
                    />
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        className={classes.profile}
                    >
                        <Typography>{product.name}</Typography>
                        <Box className={classes.box}>
                            <Typography className={classes.text}>
                                制作会社: {product.organizer.name}
                            </Typography>
                            <Typography className={classes.text}>
                                開催場所:{' '}
                                {product.performances.map(
                                    (performance: PerformanceWithVenue) => (
                                        <span key={performance.id}>
                                            {performance.venue.name}
                                        </span>
                                    ),
                                )}
                            </Typography>
                            <Typography className={classes.text}>
                                カテゴリ: {product.category.name}
                            </Typography>
                        </Box>
                        <Ratings
                            number={product.avg_rating || 0}
                            justify="flex-start"
                            size="small"
                            className={{ marginLeft: '4px' }}
                        />
                    </Grid>
                    <NavigateNextIcon />
                </Grid>
            </CardActionArea>
        </Card>
    )
}
