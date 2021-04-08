import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import { SearchByVenuesTemplate as Template } from './layout'
import { CircularLoader } from '../../_reusable/Loader/CircularLoader'

import axios from 'axios'

interface Prop {
    id: number
    name: string
    addr_pref_id: number
    addr_prefecture: string
    service_name: string
}

export const SearchByVenues: FC = () => {
    const [venues, setVenues] = useState<Prop[][]|null>(null)

    const getVenues = async() => {
        const response = await axios.get<Prop[][]>(`${process.env.API_BASEURL}/v1/search/venues`)
        return response.data
    }

    useEffect(() => {
        getVenues().then(
            (result) => {
                setVenues(result)
            }
        )
    }, [])

    return (
        <>
            <Helmet>
                <title>キーワードで検索 - なぞログ</title>
            </Helmet>
            {venues &&
                <Template venues={venues} />
            }
            {!venues && <CircularLoader />}
        </>
    )
}