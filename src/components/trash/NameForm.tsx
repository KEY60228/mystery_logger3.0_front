import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

interface Props {
    name: string
    setName: (value: string) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
    margin?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            width: className.width,
            margin: className.margin,
        }),
    }),
)

export const NameForm: FC<Props> = ({ name, setName, className }) => {
    const classes = useStyles(className)

    return (
        <TextField
            id="name"
            label="Name"
            value={name}
            onChange={ev => setName(ev.target.value)}
            className={classes.root}
        />
    )
}
