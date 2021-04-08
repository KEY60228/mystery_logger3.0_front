import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import { SearchByOrganizersTemplate as Template } from './layout'
import { CircularLoader } from '../../_reusable/Loader/CircularLoader'

import axios from 'axios'

interface Prop {
    id: number
    service_name: string
    company_name: string
}

export const SearchByOrganizers: FC = () => {
    const [organizers, setOrganizers] = useState<Prop[]|null>(null)

    const getOrganizers = async() => {
        const response = await axios.get<Prop[]>(`${process.env.API_BASEURL}/v1/search/organizers`)
        setOrganizers(response.data)
    }

    useEffect(() => {
        getOrganizers()
    }, [])

    return (
        <>
            <Helmet>
                <title>キーワードで検索 - なぞログ</title>
            </Helmet>
            {organizers &&
                <Template organizers={organizers} />
            }
            {!organizers && <CircularLoader />}
        </>
    )
}