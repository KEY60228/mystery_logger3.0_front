import React, { FC, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Typography, Grid } from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import { VenueDetail } from '../../../@types';

interface Props {
    venue: VenueDetail
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
            padding: '8px',
        },
        card: {
            margin: '8px 16px',
        },
    })
)

const Pin = ({ lat, lng }: {lat: number, lng: number}) => <RoomIcon color="error" fontSize="large" />

export const SimpleMap: FC<Props> = props => {
    const classes = useStyles()
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <Card className={classes.root} onClick={() => setOpen(!open)}>
                <Grid container wrap='nowrap' justify='space-between'>
                    <Typography>アクセス</Typography>
                    { !open &&
                        <ExpandMoreIcon />
                    }
                    { open &&
                        <ExpandLessIcon />
                    }
                </Grid>
            </Card>
            { open &&
                <Card className={classes.card}>
                    {/* Important! Always set the container height explicitly */}
                    <div style={{ height: '320px', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY || '' /* API KEY */ }}
                            defaultCenter={{
                                // lat: venue.lat
                                lat: 35.6984357,
                                // lng: venue.lng
                                lng: 139.7035704
                            }}
                            defaultZoom={16}
                        >
                            <Pin
                                // lat={venue.lat}
                                lat={35.6984357}
                                // lng={venue.lng}
                                lng={139.7035704}
                                // text={venue.name}
                            />
                        </GoogleMapReact>
                    </div>
                </Card>
            }
        </>
    )
}
// 35.6984357,139.7035704,17z
// GCPコンソールでHTTPリファラorIPアドレスの制限をかける
// dotenvで見辛くする
