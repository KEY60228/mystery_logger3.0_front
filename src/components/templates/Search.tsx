import React, { FC, useEffect, useState } from 'react'

import { ProductDetail, Performance } from '../../@types';
import { SearchBox } from '../organisms/Search/SearchBox'
import { SearchResult } from '../organisms/Search/SearchResult'
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

    // productsからorganizerを抜き出し、重複削除。0に初期値を当てる。
    // これが「良い」やり方か今は判断つかん 
    // あるいはどこかに定義ファイルを置く？
    const organizers: {
        id: number,
        name: string
    }[] = products.map(
        (product: ProductDetail) => product.organizer
    ).filter((el1, i1, arr) => {
        return (arr.findIndex((el2) => {
            return (el1.id === el2.id)
        }) === i1)
    })
    organizers.unshift({id: 0, name: '主催団体を選択'})

    // productsからperformances、さらにveunuesを抜き出し、結合、重複削除。0に初期値を当てる。
    // やり方については同上。もっと良いやり方がある気がする。
    const venues: {
        id: number,
        name: string,
    }[] = products.map(
        product => product.performances.map(
            performance => performance.venue
        )
    ).reduce(
        (acc, value) => acc.concat(value)
    ).filter((el1, i1, arr) => {
        return (arr.findIndex((el2) => {
            return (el1.id === el2.id)
        }) === i1)
    })
    venues.unshift({id: 0, name: '会場を選択'})

    // productsからcategoryの抜き出し。以下同上。
    const categories: {
        id: number,
        name: string,
    }[] = products.map(
        product => product.category
    ).filter((el1, i1, arr) => {
        return (arr.findIndex((el2) => {
            return (el1.id === el2.id)
        }) === i1)
    })
    categories.unshift({id: 0, name: 'カテゴリーを選択'})

    useEffect(() => {
        setResults(products)
    }, [])

    return (
        <>
            <SearchBox
                organizers={organizers}
                venues={venues}
                categories={categories}
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