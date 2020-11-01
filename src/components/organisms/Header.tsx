import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        titleButton: {
            margin: 'auto',
        },
        titleText: {
            fontSize: '28px',
            color: 'white',
        },
    }),
)

export const Header: FC = () => {
    const classes = useStyles()

    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Button component={Link} to="/" className={classes.titleButton}>
                    <Typography variant="h1" className={classes.titleText}>
                        なぞログ
                    </Typography>
                </Button>
            </Toolbar>
        </AppBar>
    )
}
