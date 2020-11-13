import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions';

interface Props {
    deleteReview: () => void
    confirmOpen: boolean
    setConfirmOpen: (value: boolean) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    })
)

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ConfirmDeleteReview: FC<Props> = ({
    deleteReview, confirmOpen, setConfirmOpen, className
}) => {
    const classes = useStyles(className)

    const confirmDelete = () => {
        deleteReview()
        setConfirmOpen(false)
    }

    const cancelDelete = () => {
        setConfirmOpen(false)
    }

    return (
        <Dialog
            open={confirmOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={cancelDelete}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"本当に削除しますか？"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    一度削除したものは取り消せません
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelDelete} color="primary">
                    キャンセル
                </Button>
                <Button onClick={confirmDelete} color="primary">
                    削除する
                </Button>
            </DialogActions>
        </Dialog>
    )
}
