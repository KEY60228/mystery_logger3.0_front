import React, { FC } from 'react'

import { PropsForTopPage } from '../../@types'

import { Banner } from './components/Banner'
import { ProductRankings } from './components/ProductRankings'
import { ProductsByCategory } from './components/ProductsByCategory'
import { UserRankings } from './components/UserRankings'
import { SearchBox } from '../../reusable/SearchBox'
import { Footer } from '../../reusable/Footer'

interface Props {
    products: PropsForTopPage
    keywords: string
    setKeywords: React.Dispatch<React.SetStateAction<string>>
}


export const TopPageTemplate: FC<Props> = props => {
    return (
        <>
            <Banner />
            <ProductRankings products={props.products} />
            <SearchBox
                keywords={props.keywords}
                setKeywords={props.setKeywords}
            />
            <ProductsByCategory products={props.products} />
            <UserRankings users={props.products} />
            <Footer />
        </>
    )
}
