import React, { FC, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { ProductIndex } from '../../@types'
import { SearchResultTemplate as Template } from './layout'

import { CircularLoader } from '../../_reusable/Loader/CircularLoader'
import axios from 'axios'
import queryString from 'query-string'

export const SearchResult: FC = () => {
    const query = queryString.parse(useLocation().search)
    const [results, setResults] = useState<ProductIndex[]|null>(null)

    const getResults = async() => {
        let url = '/v1/search?'
        if (query.keywords) url += `keywords=${query.keywords}&`
        if (query.ranking) url += `ranking=${query.ranking}&`
        if (query.organizer) url += `organizer=${query.organizer}&`
        if (query.venue) url += `venue=${query.venue}&`
        if (query.category) url += `category=${query.category}&`
        const response = await axios.get(`${process.env.API_BASEURL}${url}`)
        return response.data
    }

    useEffect(() => {
        getResults().then(result => setResults(result)) 
    }, [])

    return (
        <>
            <Helmet>
                <title>検索結果 - なぞログ</title>
            </Helmet>
            {results &&
                <Template results={results} />
            }
            {!results && <CircularLoader />}
        </>
    )
}