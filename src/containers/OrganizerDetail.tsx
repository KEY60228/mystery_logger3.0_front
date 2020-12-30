import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../stores/index'
import { OrganizerDetail as OrganizerDetailInterface } from '../@types'
import { asyncGetOrganizer } from '../ajax/organizer'
import { OrganizerDetail as OrganizerDetailTemp } from '../components/templates/OrganizerDetail'
import { CircularLoader } from '../Loader/CircularLoader'

export const OrganizerDetail: FC = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const [organizer, setOrganizer] = useState<OrganizerDetailInterface | null>(
        null,
    )

    const getOrganizer = () => {
        dispatch(asyncGetOrganizer(id, setOrganizer))
    }

    useEffect(() => {
        getOrganizer()
    }, [])

    return (
        <>
            <Helmet>
                <title>団体情報 - なぞログ</title>
            </Helmet>
            {organizer && <OrganizerDetailTemp organizer={organizer} />}
            {!organizer && <CircularLoader />}
        </>
    )
}
