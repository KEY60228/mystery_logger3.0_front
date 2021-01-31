import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Snackbar, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
import { setPopper } from '../../stores/error'
import { useAppDispatch } from '../../stores'

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '56px',
        },
    }),
)

export const CommentPop: FC<Props> = props => {
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const handleClose = (
        ev: React.SyntheticEvent | React.MouseEvent,
        reason?: string,
    ) => {
        props.setOpen(false)
        dispatch(setPopper(null))
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={props.open}
            autoHideDuration={3000}
            onClose={handleClose}
            className={classes.root}
        >
            <Alert
                severity="success"
                variant="filled"
                onClose={handleClose}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                コメントしました
            </Alert>
        </Snackbar>
    )
}
