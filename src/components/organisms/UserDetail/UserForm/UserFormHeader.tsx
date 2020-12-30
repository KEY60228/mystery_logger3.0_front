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

import { UserDetail } from '../../../../@types'

interface Props {
    user: UserDetail
    update: () => void
    onClose: () => void
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

export const UserFormHeader: FC<Props> = props => {
    const classes = useStyles(props.className)

    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    wrap="nowrap"
                >
                    <IconButton color="inherit" onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6">ユーザー情報編集</Typography>
                    <Button color="inherit" onClick={props.update}>
                        更新
                    </Button>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
