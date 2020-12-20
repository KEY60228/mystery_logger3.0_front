import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Snackbar, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '56px',
        },
    })
)

export const LoginPop: FC<Props> = props => {
    const classes = useStyles()

    const handleClose = (ev: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        props.setOpen(false)
    }

    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={props.open}
            autoHideDuration={3000}
            onClose={handleClose}
            className={classes.root}
        >
            <Alert
                severity='success'
                variant="filled"
                onClose={handleClose}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                ログインしました
            </Alert>
        </Snackbar>
    )
}