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
    update: (id: number) => void
    setOpen: (value: boolean) => void
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

export const UserFormHeader: FC<Props> = ({
    user,
    update,
    setOpen,
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
                    <Typography variant="h6">ユーザー情報編集</Typography>
                    <Button color="inherit" onClick={() => update(user.id)}>
                        更新
                    </Button>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
