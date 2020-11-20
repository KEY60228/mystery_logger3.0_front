import React, { FC, ChangeEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { Select, MenuItem } from '@material-ui/core'

interface Props {
    venue: number
    setVenue: (value: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '200px',
            margin: '8px',
        },
    }),
)

export const VenueForm: FC<Props> = ({ venue, setVenue }) => {
    const classes = useStyles()

    return (
        <>
            <Select
                id="venue-select"
                value={venue}
                onChange={(ev: ChangeEvent<{ value: unknown }>) =>
                    setVenue(ev.target.value as number)
                }
                className={classes.root}
            >
                <MenuItem value={0}>会場を選択</MenuItem>
                <MenuItem value={1}>東新宿GUNKAN</MenuItem>
                <MenuItem value={2}>下北沢スクラップ</MenuItem>
            </Select>
        </>
    )
}
