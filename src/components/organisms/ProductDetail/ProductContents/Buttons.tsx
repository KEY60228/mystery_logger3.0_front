import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography } from '@material-ui/core'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import QueueIcon from '@material-ui/icons/Queue'

import { Product, ProductDetail, CurrentUser } from '../../../../@types'
import { RootState, useAppDispatch } from '../../../../stores'
import { useSelector } from 'react-redux'
import { setPopper } from '../../../../stores/error'

interface Props {
    product: ProductDetail
    currentUser: CurrentUser | null
    setModalOpen: (value: boolean) => void
    setIsNew: (value: boolean) => void
    edit: () => void
    wanna: (product: Product) => void
    unwanna: (product: Product) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: '8px',
        },
    }),
)

export const Buttons: FC<Props> = props => {
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const onClickDone = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        props.setIsNew(true)
        props.setModalOpen(true)
    }

    const onClickEdit = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        props.edit()
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {(!currentUser ||
                !currentUser.done_id.includes(props.product.id)) && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClickDone}
                    className={classes.button}
                >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <DirectionsRunIcon />
                        <Typography variant="caption">
                            {props.product.reviews_count}
                        </Typography>
                    </Grid>
                </Button>
            )}
            {currentUser && currentUser.done_id.includes(props.product.id) && (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onClickEdit}
                    className={classes.button}
                >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <DirectionsRunIcon />
                        <Typography variant="caption">
                            {props.product.reviews_count}
                        </Typography>
                    </Grid>
                </Button>
            )}
            {(!currentUser ||
                !currentUser.wanna_id.includes(props.product.id)) && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.wanna(props.product)}
                    className={classes.button}
                >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <QueueIcon />
                        <Typography variant="caption">
                            {props.product.wannas_count}
                        </Typography>
                    </Grid>
                </Button>
            )}
            {currentUser && currentUser.wanna_id.includes(props.product.id) && (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.unwanna(props.product)}
                    className={classes.button}
                >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <QueueIcon />
                        <Typography variant="caption">
                            {props.product.wannas_count}
                        </Typography>
                    </Grid>
                </Button>
            )}
        </Grid>
    )
}
