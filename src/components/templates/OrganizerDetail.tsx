import React, { FC } from 'react'

import { OrganizerDetail as OrganizerDetailInterface } from '../../@types'
import { OrganizerCard } from '../organisms/OrganizerDetail/OrganizerCard'
import { OrganizerProducts } from '../organisms/OrganizerDetail/OrganizerProducts'
import { OrganizerVenues } from '../organisms/OrganizerDetail/OrganizerVenues'
import { TempSpace } from '../molecules/TempSpace'

interface Props {
    organizer: OrganizerDetailInterface
}

export const OrganizerDetail: FC<Props> = (props) => {
    return (
        <>
            <OrganizerCard
                organizer={props.organizer}
            />
            <OrganizerVenues venues={props.organizer.venues} />
            <OrganizerProducts products={props.organizer.products} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}