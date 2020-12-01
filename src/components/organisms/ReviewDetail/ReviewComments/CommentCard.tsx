import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Card, CardMedia, Grid, Typography } from '@material-ui/core'

import { CommentDetail } from '../../../../@types'

interface Props {
    comment: CommentDetail
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
            padding: '8px',
        },
        media: {
            height: '36px',
            minWidth: '36px',
            border: '1px solid grey',
            borderRadius: '50%',
        },
        contents: {
            marginLeft: '8px',
        },
        userName: {
            textDecoration: 'none',
            color: 'black',
            fontSize: '14px',
        },
        userId: {
            textDecoration: 'none',
            color: 'grey',
            fontSize: '10px',
            marginLeft: '8px',
        },
        comment: {
            margin: '8px',
        },
    }),
)

export const CommentCard: FC<Props> = props => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <Grid container wrap="nowrap">
                <CardMedia
                    image={`/user_img/${props.comment.user.image_name}`}
                    component={Link}
                    to={`/users/${props.comment.user?.account_id}`}
                    className={classes.media}
                />
                <Grid container direction="column" className={classes.contents}>
                    <Grid container wrap="nowrap" alignItems="center">
                        <Typography
                            variant="body1"
                            component={Link}
                            to={`/users/${props.comment.user.account_id}`}
                            className={classes.userName}
                        >
                            {props.comment.user.name}
                        </Typography>
                        <Typography
                            variant="body1"
                            component={Link}
                            to={`/users/${props.comment.user.account_id}`}
                            className={classes.userId}
                        >
                            @{props.comment.user.account_id}
                        </Typography>
                    </Grid>
                    <Typography variant="body2" className={classes.comment}>
                        {props.comment.contents}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}
