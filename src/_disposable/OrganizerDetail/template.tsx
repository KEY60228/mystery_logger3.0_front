import React, { FC } from 'react'

import { OrganizerDetail as OrganizerDetailInterface } from '../../@types'
import { OrganizerCard } from './components/OrganizerCard'
import { OrganizerProducts } from './components/OrganizerProducts'
import { OrganizerVenues } from './components/OrganizerVenues'
import { TempSpace } from '../../_reusable/TempSpace'

interface Props {
    organizer: OrganizerDetailInterface
}

export const OrganizerDetailTemplate: FC<Props> = props => {
    return (
        <>
            <OrganizerCard organizer={props.organizer} />
            <OrganizerVenues venues={props.organizer.venues} />
            <OrganizerProducts products={props.organizer.products} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
