import React, { FC, useEffect, useState } from 'react'

import { ProductDetail, Performance } from '../../@types';
import { SearchBox } from '../organisms/Search/SearchBox/'
import { SearchResult } from '../organisms/Search/SearchResult/'
import { TempSpace } from '../molecules/TempSpace'

interface Props {
    products: ProductDetail[]
}

export const Search: FC<Props> = ({
    products
}) => {
    const [results, setResults] = useState<ProductDetail[]>([])
    const [keywords, setKeywords] = useState<string>('')
    const [category, setCategory] = useState<number>(0)
    const [organizer, setOrganizer] = useState<number>(0)
    const [venue, setVenue] = useState<number>(0)

    const search = () => {
        setResults(products.filter((product: ProductDetail) => {
            if (category && product.category_id !== category) return false
            if (organizer && product.organizer_id !== organizer) return false
            if (venue) {
                const result = product.performances.find(
                    (performance: Performance) => performance.venue_id === venue
                )
                if (result === undefined) return false
            }
            return true
        }))
    }

    useEffect(() => {
        setResults(products)
    }, [])

    return (
        <>
            <SearchBox
                search={search}
                keywords={keywords}
                setKeywords={setKeywords}
                category={category}
                setCategory={setCategory}
                organizer={organizer}
                setOrganizer={setOrganizer}
                venue={venue}
                setVenue={setVenue}
            />
            <SearchResult results={results} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}