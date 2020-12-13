import React, { FC, useEffect, useState } from 'react'

import { ProductIndex, Performance } from '../../@types'
import { SearchBox } from '../organisms/Search/SearchBox'
import { SearchResult } from '../organisms/Search/SearchResult'
import { TempSpace } from '../molecules/TempSpace'
import { SortBox } from '../organisms/Search/SortBox'

interface Props {
    products: ProductIndex[]
}

export const Search: FC<Props> = props => {
    const [results, setResults] = useState<ProductIndex[]>([])
    const [keywords, setKeywords] = useState<string>('')
    const [category, setCategory] = useState<number>(0)
    const [organizer, setOrganizer] = useState<number>(0)
    const [venue, setVenue] = useState<number>(0)

    const search = () => {
        setResults(
            props.products.filter((product: ProductIndex) => {
                if (category && product.category_id !== category) return false
                if (organizer && product.organizer_id !== organizer)
                    return false
                if (venue) {
                    const result = product.performances.find(
                        (performance: Performance) =>
                            performance.venue_id === venue,
                    )
                    if (result === undefined) return false
                }
                // 仮 検索ロジック。もう少し精度あげる方法あるかも…？
                // 作品名、主催団体サービス名、会場名でフィルター
                if (
                    keywords
                    && product.name.indexOf(keywords) === -1
                    && product.kana_name.indexOf(keywords) === -1
                    && product.organizer.service_name.indexOf(keywords) === -1
                    && product.organizer.kana_service_name.indexOf(keywords) === -1
                    && product.performances.filter(performance => performance.venue.name.indexOf(keywords) !== -1).length === 0
                    && product.performances.filter(performance => performance.venue.kana_name.indexOf(keywords) !== -1).length === 0
                ) {
                    return false
                }
                return true
            }),
        )
    }

    // productsからorganizerを抜き出し、重複削除。0に初期値を当てる。
    // これが「良い」やり方か今は判断つかん
    // あるいはどこかに定義ファイルを置く？
    const organizers: {
        id: number
        name: string
    }[] = props.products
        .map((product: ProductIndex) => {
            return {id: product.organizer.id, name: product.organizer.service_name}
        }).filter((el1, i1, arr) => {
            return (
                arr.findIndex(el2 => {
                    return el1.id === el2.id
                }) === i1
            )
        })
    organizers.unshift({ id: 0, name: '主催団体を選択' })

    // productsからperformances、さらにveunuesを抜き出し、結合、重複削除。0に初期値を当てる。
    // やり方については同上。もっと良いやり方がある気がする。
    const venues: {
        id: number
        name: string
    }[] = props.products
        .map(product =>
            product.performances.map(performance => performance.venue),
        )
        .reduce((acc, value) => acc.concat(value))
        .filter((el1, i1, arr) => {
            return (
                arr.findIndex(el2 => {
                    return el1.id === el2.id
                }) === i1
            )
        })
    venues.unshift({ id: 0, name: '会場を選択' })

    // productsからcategoryの抜き出し。以下同上。
    const categories: {
        id: number
        name: string
    }[] = props.products
        .map(product => product.category)
        .filter((el1, i1, arr) => {
            return (
                arr.findIndex(el2 => {
                    return el1.id === el2.id
                }) === i1
            )
        })
    categories.unshift({ id: 0, name: 'カテゴリーを選択' })

    // レビュー数でソート
    const sortProductsByReviewsCount = () => {
        if (!results) return
        setResults(
            results
                .sort((a, b) => {
                    return b.reviews_count - a.reviews_count
                })
                .slice(),
        )
    }

    // レートでソート
    const sortProductsByAvgRatings = () => {
        if (!results) return
        setResults(
            results
                .sort((a, b) => {
                    const avgRatingA = a.avg_rating || 0
                    const avgRatingB = b.avg_rating || 0
                    return avgRatingB - avgRatingA
                })
                .slice(),
        )
    }

    // 成功率でソート (高い順)
    const sortProductsBySuccessRatesDesc = () => {
        if (!results) return
        setResults(
            results
                .sort((a, b) => {
                    const successRateA = a.success_rate || 0
                    const successRateB = b.success_rate || 0
                    return successRateB - successRateA
                })
                .slice(),
        )
    }

    // 成功率でソート (低い順)
    const sortProductsBySuccessRatesAsc = () => {
        if (!results) return
        setResults(
            results
                .sort((a, b) => {
                    const successRateA = a.success_rate || 0
                    const successRateB = b.success_rate || 0
                    return successRateA - successRateB
                })
                .slice(),
        )
    }

    // wanna数でソート
    const sortProductsByWannasCount = () => {
        if (!results) return
        setResults(
            results
                .sort((a, b) => {
                    return b.wannas_count - a.wannas_count
                })
                .slice(),
        )
    }

    useEffect(() => {
        setResults(props.products)
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
            <SortBox
                sortProductsByReviewsCount={sortProductsByReviewsCount}
                sortProductsByAvgRatings={sortProductsByAvgRatings}
                sortProductsBySuccessRatesDesc={sortProductsBySuccessRatesDesc}
                sortProductsBySuccessRatesAsc={sortProductsBySuccessRatesAsc}
                sortProductsByWannasCount={sortProductsByWannasCount}
            />
            <SearchResult results={results} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
