import React, { FC, ChangeEvent } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { Select, MenuItem } from '@material-ui/core'

interface Props {
    organizer: number
    setOrganizer: (value: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '200px',
            margin: '8px',
        },
    }),
)

export const OrganizerForm: FC<Props> = ({ organizer, setOrganizer }) => {
    const classes = useStyles()

    return (
        <>
            <Select
                id="organizer-select"
                value={organizer}
                onChange={(ev: ChangeEvent<{ value: unknown }>) =>
                    setOrganizer(ev.target.value as number)
                }
                className={classes.root}
            >
                <MenuItem value={0}>主催団体を選択</MenuItem>
                <MenuItem value={1}>スクラップ</MenuItem>
                <MenuItem value={2}>絶対空間</MenuItem>
                <MenuItem value={3}>謎ハウス</MenuItem>
                <MenuItem value={4}>NoEscape</MenuItem>
                <MenuItem value={5}>超密室</MenuItem>
                <MenuItem value={6}>謎キャッスル</MenuItem>
                <MenuItem value={7}>REBUILD</MenuItem>
                <MenuItem value={8}>サニーサニーピクニック</MenuItem>
                <MenuItem value={9}>なぞばこ</MenuItem>
                <MenuItem value={10}>インスパイヤ</MenuItem>
                <MenuItem value={11}>なぞともカフェ</MenuItem>
            </Select>
        </>
    )
}
