import React, { FC } from 'react'

import { VenueDetail as VenueDetailInterface } from '../../@types'
import { VenueContents } from '../organisms/VenueDetail/VenueContents'
import { VenuePerformances } from '../organisms/VenueDetail/VenuePerformances'
import { SimpleMap } from '../organisms/VenueDetail/GoogleMaps'
import { TempSpace } from '../../reusable/TempSpace'

interface Props {
    venue: VenueDetailInterface
}

export const VenueDetail: FC<Props> = props => {
    return (
        <>
            <VenueContents venue={props.venue} />
            <SimpleMap venue={props.venue} />
            <VenuePerformances performances={props.venue.performances} />
            <TempSpace
                text="Ad Space"
                className={{ height: '320px', margin: '12px auto 60px' }}
            />
        </>
    )
}
