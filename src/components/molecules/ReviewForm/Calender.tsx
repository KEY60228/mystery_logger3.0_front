import React, { FC, useEffect, useState } from 'react'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'

interface Props {
    date: string | null
    setDate: (value: string | null) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            width: className.width,
        }),
    }),
)

export const Calender: FC<Props> = props => {
    const classes = useStyles(props.className)
    const handleDateChange = (newDate: Date | null) => {
        const joined = newDate?.toString() || null
        props.setDate(joined)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                format="yyyy/MM/dd"
                margin="normal"
                id="joined-date"
                label="Joined Date"
                value={props.date ? new Date(props.date) : null}
                onChange={handleDateChange}
                className={classes.root}
            />
        </MuiPickersUtilsProvider>
    )
}
