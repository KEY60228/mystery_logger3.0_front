import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    Grid,
    Box,
    CardMedia,
    CardActionArea,
} from '@material-ui/core'

import { Review, User, Product } from '../../../../@types'
import { RootState } from '../../../../stores/index'
import { ReviewerMenu } from './ReviewerMenu'
import { FollowButton } from '../../FollowButton'

interface ReviewDetail extends Review {
    user?: User
    product?: Product
}

interface Props {
    review: ReviewDetail
    edit: (value: ReviewDetail) => void
    setConfirmOpen: (value: boolean) => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        imgArea: {
            width: '60px',
        },
        img: {
            height: '48px',
            width: '48px',
            border: '1px solid grey',
            borderRadius: '50%',
            margin: '8px',
        },
        nameArea: {
            marginLeft: '8px',
            flexGrow: 1,
        },
        userName: {
            textDecoration: 'none',
            color: 'black',
            fontSize: '16px',
        },
        userId: {
            textDecoration: 'none',
            color: 'grey',
            fontSize: '12px',
        },
    }),
)

export const ReviewerProfile: FC<Props> = props => {
    const classes = useStyles(props.className)
    const currentUser = useSelector((state: RootState) => state.auth.user)

    return (
        <Grid container wrap="nowrap" alignItems="center">
            <CardActionArea
                component={Link}
                to={`/users/${props.review.user?.account_id}`}
                className={classes.imgArea}
            >
                <CardMedia
                    image={`${process.env.API_BASEURL}${props.review.user?.image_name}`}
                    className={classes.img}
                />
            </CardActionArea>
            <Box className={classes.nameArea}>
                <Grid container direction="column">
                    <Box>
                        <Link
                            to={`/users/${props.review.user?.account_id}`}
                            className={classes.userName}
                        >
                            {props.review.user?.name}
                        </Link>
                    </Box>
                    <Box>
                        <Link
                            to={`/users/${props.review.user?.account_id}`}
                            className={classes.userId}
                        >
                            @{props.review.user?.account_id}
                        </Link>
                    </Box>
                </Grid>
            </Box>
            {currentUser &&
                props.review.user &&
                props.review.user.account_id !== currentUser.account_id && (
                    <FollowButton
                        currentUser={currentUser}
                        user={props.review.user}
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
                )}
            {currentUser &&
                props.review.user?.account_id === currentUser.account_id && (
                    <ReviewerMenu
                        review={props.review}
                        edit={props.edit}
                        setConfirmOpen={props.setConfirmOpen}
                    />
                )}
        </Grid>
    )
}
