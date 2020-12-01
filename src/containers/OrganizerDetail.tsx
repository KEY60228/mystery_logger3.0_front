import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { OrganizerDetail as OrganizerDetailInterface } from '../@types'
import { asyncGetOrganizer } from '../ajax/organizer'
import { OrganizerDetail as OrganizerDetailTemp } from '../components/templates/OrganizerDetail'

export const OrganizerDetail: FC = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const [organizer, setOrganizer] = useState<OrganizerDetailInterface | null>(null)

    const getOrganizer = () => {
        dispatch(asyncGetOrganizer(id, setOrganizer))
    }

    useEffect(() => {
        getOrganizer()
    }, [])

    return (
        <>
            {organizer &&
                <OrganizerDetailTemp organizer={organizer} />
            }
            {!organizer &&
                <div>loading</div>
            }
        </>
    )
}