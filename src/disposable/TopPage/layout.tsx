import React, { FC } from 'react'

import { PropsForTopPage } from '../../@types'
import { Footer } from '../../reusable/Footer'

import { Banner } from './components/Banner'
import { ProductRankings } from './components/ProductRankings'
import { SearchBox } from './components/SearchBox'
import { ProductsByCategory } from './components/ProductsByCategory'
import { UserRankings } from './components/UserRankings'

interface Props {
    products: PropsForTopPage
}


export const TopPageTemplate: FC<Props> = props => {
    return (
        <>
            <Banner />
            <ProductRankings products={props.products} />
            <SearchBox />
            <ProductsByCategory products={props.products} />
            <UserRankings users={props.products} />
            <Footer />
        </>
    )
}
