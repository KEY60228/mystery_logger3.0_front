import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { ProductIndex, PropsForTopPage } from '../../@types'
import { Footer } from '../../reusable/Footer'

import { ProductRankings } from './components/ProductRankings'
import { SearchBox } from './components/SearchBox'
import { ProductsByCategory } from './components/ProductsByCategory'
import { UserRankings } from './components/UserRankings'

interface Props {
    products: PropsForTopPage
}

const useStyles = makeStyles(() =>
    createStyles({
        image: {
            width: '100%',
            height: '192px',
            objectFit: 'cover',
            verticalAlign: 'top',
        },
    }),
)

export const TopPageTemplate: FC<Props> = props => {
    const classes = useStyles()

    const sortProductsByReviewsCount = (products: ProductIndex[]) => {
        return products
            .sort((a, b) => {
                return b.reviews_count - a.reviews_count
            })
            .slice(0, 6)
    }

    return (
        <>
            <img src="./img/Banner.png" className={classes.image} />
            <ProductRankings products={props.products} />
            <SearchBox />
            <ProductsByCategory products={props.products} />
            <UserRankings users={props.products} />
            <Footer />
        </>
    )
}
