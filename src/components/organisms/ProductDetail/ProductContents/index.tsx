import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Box, Grid, Typography } from '@material-ui/core'

import { Product, ProductDetail, User } from '../../../../@types'
import { Ratings } from '../../../molecules/Ratings'
import { Buttons } from './Buttons'
import { ProductProfile } from './ProductProfile'

interface Props {
    product: ProductDetail
    currentUser: User | null
    setModalOpen: (value: boolean) => void
    setIsNew: (value: boolean) => void
    edit: () => void
    wanna: (product: Product) => void
    unwanna: (product: Product) => void
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

export const ProductContents: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <Box className={classes.box}>
                <Typography variant="h6">{props.product.name}</Typography>
                <Typography variant="subtitle1">
                    {props.product.contents}
                </Typography>
            </Box>
            <Grid container direction="row" wrap="nowrap">
                <Grid>
                    <img
                        className={classes.media}
                        src={`/product_img/${props.product.image_name}`}
                        alt={props.product.name}
                    />
                    <Ratings
                        number={props.product.avg_rating || 0}
                        size="medium"
                        className={{ marginLeft: '4px' }}
                    />
                    <Buttons
                        product={props.product}
                        currentUser={props.currentUser}
                        setModalOpen={props.setModalOpen}
                        setIsNew={props.setIsNew}
                        edit={props.edit}
                        wanna={props.wanna}
                        unwanna={props.unwanna}
                    />
                </Grid>
                <ProductProfile product={props.product} />
            </Grid>
        </Card>
    )
}
