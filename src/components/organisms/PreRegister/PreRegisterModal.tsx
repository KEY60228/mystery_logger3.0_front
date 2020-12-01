import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, Box, Typography } from '@material-ui/core'

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
    setEmail: (value: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        paper: {
            position: 'absolute',
            top: '250px',
            width: '90%',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        text: {
            fontSize: '12px',
        },
    }),
)

export const PreRegisterModal: FC<Props> = props => {
    const classes = useStyles()

    const handleClose = () => {
        props.setEmail('')
        props.setOpen(false)
    }

    return (
        <Modal
            className={classes.root}
            open={props.open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Box className={classes.paper}>
                    <Typography variant="body1" className={classes.text}>
                        御登録のアドレス宛にメールを送信しました。
                    </Typography>
                    <Typography variant="body1" className={classes.text}>
                        アドレスに記載されているURLから本登録を進めてください。
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    )
}
