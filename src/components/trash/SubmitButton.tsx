import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

interface Props {
    onClick: () => void
    size?: 'large' | 'medium' | 'small'
    className?: ClassProps
}

interface ClassProps {
    margin?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            margin: className.margin || '24px',
        }),
    }),
)

export const SubmitButton: FC<Props> = ({ onClick, size, className }) => {
    const classes = useStyles(className)

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            size={size}
            className={classes.root}
        >
            Submit
        </Button>
    )
}
