import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, Box } from '@material-ui/core'

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setEmail: React.Dispatch<React.SetStateAction<string>>
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        innerBox: {
            position: 'absolute',
            top: '250px',
            width: '90%',
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        text: {
            lineHeight: '16px',
            fontSize: '12px',
        },
    })
)

export const PreRegisteredModal: FC<Props> = props => {
    const classes = useStyles()

    const handleClose = () => {
        props.setEmail('')
        props.setOpen(false)
    }

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.root}
        >
            <Fade in={props.open}>
                <Box className={classes.innerBox}>
                    <p className={classes.text}>ご登録のアドレス宛にメールを送信しました。</p>
                    <p className={classes.text}>アドレスに記載されているURLから本登録を進めてください。</p>
                    <p className={classes.text}>メールが届かない場合はお手数ですが再度アドレスをお確かめの上登録してください。</p>
                </Box>
            </Fade>
        </Modal>
    )
}