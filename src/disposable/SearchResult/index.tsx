import React, { FC, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Search } from '../../@types'
import { SearchResultTemplate as Template } from './layout'

import { CircularLoader } from '../../_reusable/Loader/CircularLoader'
import axios from 'axios'
import queryString from 'query-string'

export const SearchResult: FC = () => {
    const search = useLocation().search
    const query = queryString.parse(useLocation().search)
    const [results, setResults] = useState<Search|null>(null)
    const [reloading, setReloading] = useState<boolean>(false)

    const [sortOpen, setSortOpen] = useState<boolean>(false)
    const [filterOpen, setFilterOpen] = useState<boolean>(false)

    const [keywords, setKeywords] = useState<string>('')
    const [organizer, setOrganizer] = useState<string>('')
    const [venue, setVenue] = useState<string>('')
    const [pref, setPref] = useState<string>('')
    const [category, setCategory] = useState<string>('')

    const getResults = async() => {
        let url = '/v1/search?'
        if (query.keywords) url += `keywords=${query.keywords}&`
        if (query.ranking) url += `ranking=${query.ranking}&`
        if (query.organizer) url += `organizer=${query.organizer}&`
        if (query.venue) url += `venue=${query.venue}&`
        if (query.pref) url += `pref=${query.pref}&`
        if (query.category) url += `category=${query.category}&`
        if (query.page) url += `page=${query.page}`
        const response = await axios.get<Search>(`${process.env.API_BASEURL}${url}`)
        return response.data
    }

    useEffect(() => {
        setReloading(true)
        getResults().then((result) => {
            setResults(result)
            setReloading(false)
        })
        if (query.keywords && !Array.isArray(query.keywords)) setKeywords(query.keywords)
        if (query.organizer && !Array.isArray(query.organizer)) setOrganizer(query.organizer)
        if (query.venue && !Array.isArray(query.venue)) setVenue(query.venue)
        if (query.pref && !Array.isArray(query.pref)) setPref(query.pref)
        if (query.category && !Array.isArray(query.category)) setCategory(query.category)
    }, [search])

    // 後ほど分離 (SearchByOrganizerも)
    interface OrganizerProp {
        id: number
        service_name: string
        company_name: string
    }
    const [organizers, setOrganizers] = useState<OrganizerProp[]|null>(null)
    const getOrganizers = async() => {
        const response = await axios.get<OrganizerProp[]>(`${process.env.API_BASEURL}/v1/search/organizers`)
        return response.data
    }

    // 後ほど分離 (SearchByVenueも)
    interface VenueProp {
        id: number
        name: string
        addr_pref_id: number
        addr_prefecture: string
        service_name: string
    }
    const [venues, setVenues] = useState<VenueProp[][]|null>(null)
    const getVenues = async() => {
        const response = await axios.get<VenueProp[][]>(`${process.env.API_BASEURL}/v1/search/venues`)
        return response.data
    }

    useEffect(() => {
        getOrganizers().then(result => setOrganizers(result))
        getVenues().then(result => setVenues(result))
    }, [])

    return (
        <>
            <Helmet>
                <title>検索結果 - なぞログ</title>
            </Helmet>
            {(results && !reloading) &&
                <Template
                    search={search}
                    results={results}
                    keywords={keywords}
                    setKeywords={setKeywords}
                    sortOpen={sortOpen}
                    setSortOpen={setSortOpen}
                    filterOpen={filterOpen}
                    setFilterOpen={setFilterOpen}
                    organizers={organizers}
                    venues={venues}
                    organizer={organizer}
                    setOrganizer={setOrganizer}
                    venue={venue}
                    setVenue={setVenue}
                    pref={pref}
                    setPref={setPref}
                    category={category}
                    setCategory={setCategory}
                />
            }
            {(!results || reloading) && <CircularLoader />}
        </>
    )
}