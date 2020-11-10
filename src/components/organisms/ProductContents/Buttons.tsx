import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography } from '@material-ui/core'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import QueueIcon from '@material-ui/icons/Queue'

import { Product, ProductDetail, User, Review } from '../../../@types'

interface Props {
    product: ProductDetail
    currentUser: User | null
    setModalOpen: (value: boolean) => void
    setIsNew: (value: boolean) => void
    edit: (review: Review) => void
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

export const Buttons: FC<Props> = ({
    product,
    currentUser,
    setModalOpen,
    setIsNew,
    edit,
    wanna,
    unwanna,
}) => {
    const classes = useStyles()

    const onClickDone = () => {
        setIsNew(true)
        setModalOpen(true)
    }

    const onClickEdit = () => {
        const review = product.reviews?.find((review: Review) => currentUser?.done_id.includes(review.id))
        if (!review) return false
        edit(review)
        setModalOpen(true)
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            { (!currentUser || !currentUser.done_id.includes(product.id)) &&
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
                            {product.reviews_count}
                        </Typography>
                    </Grid>
                </Button>
            }
            { (currentUser && currentUser.done_id.includes(product.id)) &&
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
                            {product.reviews_count}
                        </Typography>
                    </Grid>
                </Button>
            }
            { (!currentUser || !currentUser.wanna_id.includes(product.id)) &&
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => wanna(product)}
                    className={classes.button}
                >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <QueueIcon />
                        <Typography variant="caption">{800 /* 仮 */}</Typography>
                    </Grid>
                </Button>
            }
            { (currentUser && currentUser.wanna_id.includes(product.id)) &&
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => unwanna(product)}
                    className={classes.button}
                >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <QueueIcon />
                        <Typography variant="caption">{800 /* 仮 */}</Typography>
                    </Grid>
                </Button>
            }
        </Grid>
    )
}
