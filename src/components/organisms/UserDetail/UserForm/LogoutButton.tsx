import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Grid, Button } from '@material-ui/core'

interface Props {
    logout: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
            padding: '8px',
        },
        button: {},
    }),
)

export const LogoutButton: FC<Props> = props => {
    const classes = useStyles()

    const onClick = () => {
        props.logout()
    }

    return (
        <Card className={classes.root}>
            <Grid container justify="flex-end">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onClick}
                    className={classes.button}
                >
                    Logout
                </Button>
            </Grid>
        </Card>
    )
}
