import React, { FC, useEffect, useState } from 'react'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'

interface Props {
    date: Date | null
    setDate: (value: Date | null) => void
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
        props.setDate(newDate)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                format="yyyy/MM/dd"
                margin="normal"
                id="joined-date"
                label="Joined Date"
                value={props.date}
                maxDate={Date()}
                onChange={handleDateChange}
                className={classes.root}
            />
        </MuiPickersUtilsProvider>
    )
}
