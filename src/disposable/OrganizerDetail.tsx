import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

import { OrganizerDetail as OrganizerDetailInterface } from '../@types'
import { useAppDispatch } from '../stores/index'
import { asyncGetOrganizer } from '../ajax/organizer'

import { OrganizerDetail as OrganizerDetailTemp } from './templates/OrganizerDetail'
import { CircularLoader } from '../reusable/Loader/CircularLoader'

export const OrganizerDetail: FC = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const [organizer, setOrganizer] = useState<OrganizerDetailInterface | null>(
        null,
    )

    const getOrganizer = () => {
        dispatch(asyncGetOrganizer(id)).then(
            (result) => setOrganizer(result)
        ).catch(() => {return})
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
