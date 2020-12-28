import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import {
    Category,
    Organizer,
    Performance,
    Product,
    Venue,
} from '../../../@types'
import { ProductCardM } from '../../molecules/ProductCardM'

interface PerformanceWithVenue extends Performance {
    venue: Venue
}

interface ExtendsProduct extends Product {
    category: Category
    performances: PerformanceWithVenue[]
    organizer: Organizer
}

interface PerformanceWithProduct extends Performance {
    product: ExtendsProduct
}

interface Props {
    performances: PerformanceWithProduct[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        card: {
            margin: '8px',
            padding: '8px',
        },
        text: {},
    }),
)

export const VenuePerformances: FC<Props> = props => {
    const classes = useStyles()
    const [open, setOpen] = useState<boolean>(false)

    const onClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <Card className={classes.card} onClick={onClick}>
                <Grid container wrap="nowrap" justify="space-between">
                    <Typography className={classes.text}>作品一覧</Typography>
                    {!open && <ExpandMoreIcon />}
                    {open && <ExpandLessIcon />}
                </Grid>
            </Card>
            {open &&
                props.performances.map(performance => (
                    <ProductCardM
                        key={performance.product.id}
                        product={performance.product}
                        className={{ rootMargin: '16px' }}
                    />
                ))}
        </>
    )
}
