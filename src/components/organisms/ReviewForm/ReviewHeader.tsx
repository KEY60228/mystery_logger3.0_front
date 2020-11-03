import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Grid,
    Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { Product } from '../../../@types'

interface Props {
    setOpen: (value: boolean) => void
    post?: () => void
    edit: () => void
    isEdit: boolean
    product: Product
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        subtitle: {
            fontSize: '12px',
        },
    }),
)

export const ReviewHeader: FC<Props> = ({
    setOpen,
    post,
    edit,
    isEdit,
    product,
    className,
}) => {
    const classes = useStyles(className)

    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    wrap="nowrap"
                >
                    <IconButton color="inherit" onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography variant="h6">レビュー</Typography>
                        <Typography
                            variant="subtitle1"
                            className={classes.subtitle}
                        >
                            {product.name}
                        </Typography>
                    </Grid>
                    {!isEdit && (
                        <Button color="inherit" onClick={post}>
                            投稿
                        </Button>
                    )}
                    {isEdit && (
                        <Button color="inherit" onClick={edit}>
                            更新
                        </Button>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
