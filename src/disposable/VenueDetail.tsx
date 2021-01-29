import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router'

import { VenueDetail as VenueDetailInterface } from '../@types'
import { useAppDispatch } from '../stores/index'
import { asyncGetVenue } from '../ajax/venue'

import { VenueDetail as VenueDetailTemp } from './templates/VenueDetail'
import { CircularLoader } from '../reusable/Loader/CircularLoader'

export const VenueDetail: FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()

    const [venue, setVenue] = useState<VenueDetailInterface | null>(null)

    const getVenue = () => {
        dispatch(asyncGetVenue(id)).then(
            result => setVenue(result)
        ).catch(() => {return})
    }

    useEffect(() => {
        getVenue()
    }, [])

    return (
        <>
            <Helmet>
                <title>会場情報 - なぞログ</title>
            </Helmet>
            {venue && <VenueDetailTemp venue={venue} />}
            {!venue && <CircularLoader />}
        </>
    )
}
