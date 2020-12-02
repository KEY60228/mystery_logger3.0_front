import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { VenueDetail as VenueDetailInterface } from '../@types'
import { asyncGetVenue } from '../ajax/venue'
import { VenueDetail as VenueDetailTemp } from '../components/templates/VenueDetail'

export const VenueDetail: FC = () => {
    const dispatch = useDispatch()
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
                <div>loading</div>
            }
        </>
    )
}