import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { useAppDispatch } from '../stores/index'
import { VenueDetail as VenueDetailInterface } from '../@types'
import { asyncGetVenue } from '../ajax/venue'
import { VenueDetail as VenueDetailTemp } from '../components/templates/VenueDetail'
import { CircularLoader } from '../Loader/CircularLoader'

export const VenueDetail: FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{id: string}>()

    const [venue, setVenue] = useState<VenueDetailInterface | null>(null)

    const getVenue = () => {
        dispatch(asyncGetVenue(id, setVenue))
    }

    useEffect(() => {
        getVenue()
    }, [])

    return (
        <>
            { venue &&
                <VenueDetailTemp
                    venue={venue}
                />
            }
            { !venue &&
                <CircularLoader />
            }
        </>
    )
}