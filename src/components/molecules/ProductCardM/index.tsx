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
    Product,
    Performance,
    Venue,
    Organizer,
    Category,
} from '../../../@types'
import { Ratings } from '../Ratings'

interface PerformanceWithVenue extends Performance {
    venue: Venue
}

interface ExtendsProduct extends Product {
    category: Category
    performances: PerformanceWithVenue[]
    organizer: Organizer
}

interface Props {
    product: ExtendsProduct
    className?: ClassProps
}

interface ClassProps {
    rootMargin?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            margin: className.rootMargin || '8px',
        }),
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

export const ProductCardM: FC<Props> = props => {
    const classes = useStyles(props.className)

    return (
        <Card className={classes.root}>
            <CardActionArea
                component={Link}
                to={`/products/${props.product.id}`}
            >
                <Grid container wrap="nowrap" alignItems="center">
                    <CardMedia
                        image={`${process.env.API_BASEURL}${props.product.image_name}`}
                        className={classes.img}
                    />
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        className={classes.profile}
                    >
                        <Typography>{props.product.name}</Typography>
                        <Box className={classes.box}>
                            <Typography className={classes.text}>
                                制作会社: {props.product.organizer.service_name}
                            </Typography>
                            <Typography className={classes.text}>
                                開催場所:{' '}
                                {props.product.performances.map(
                                    (performance, index, array) => {
                                        if (index === array.length - 1) {
                                            return (
                                                <span key={performance.id}>
                                                    {performance.venue.name}
                                                </span>
                                            )
                                        } else {
                                            return (
                                                <span key={performance.id}>
                                                    {`${performance.venue.name} / `}
                                                </span>
                                            )
                                        }
                                    },
                                )}
                            </Typography>
                            <Typography className={classes.text}>
                                カテゴリ: {props.product.category.name}
                            </Typography>
                        </Box>
                        <Ratings
                            number={props.product.avg_rating || 0}
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
