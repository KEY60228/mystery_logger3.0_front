import React, { FC } from 'react'

import { VenueDetail as VenueDetailInterface } from '../../@types'
import { VenueContents } from '../../components/organisms/VenueDetail/VenueContents'
import { VenuePerformances } from '../../components/organisms/VenueDetail/VenuePerformances'
import { SimpleMap } from '../../components/organisms/VenueDetail/GoogleMaps'
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
