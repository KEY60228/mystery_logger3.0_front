import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography } from '@material-ui/core'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import QueueIcon from '@material-ui/icons/Queue'

import { Product, ProductDetail, User } from '../../../../@types'

interface Props {
    product: ProductDetail
    currentUser: User | null
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

    const onClickDone = () => {
        if (!props.currentUser) return false // 仮
        props.setIsNew(true)
        props.setModalOpen(true)
    }

    const onClickEdit = () => {
        if (!props.currentUser) return false // 仮
        props.edit()
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {(!props.currentUser ||
                !props.currentUser.done_id.includes(props.product.id)) && (
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
            {props.currentUser &&
                props.currentUser.done_id.includes(props.product.id) && (
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
            {(!props.currentUser ||
                !props.currentUser.wanna_id.includes(props.product.id)) && (
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
            {props.currentUser &&
                props.currentUser.wanna_id.includes(props.product.id) && (
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
