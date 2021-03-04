import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'
import { Review } from '../@types'

interface Props {
    review: Review
    deleteReview: (review: Review) => void
    confirmOpen: boolean
    setConfirmOpen: (value: boolean) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {},
    }),
)

export const ConfirmDeleteReview: FC<Props> = props => {
    const classes = useStyles()

    const confirmDelete = () => {
        props.deleteReview(props.review)
        props.setConfirmOpen(false)
    }

    const cancelDelete = () => {
        props.setConfirmOpen(false)
    }

    return (
        <Dialog
            open={props.confirmOpen}
            keepMounted
            onClose={cancelDelete}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
                {'本当に削除しますか？'}
            </DialogTitle>
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
