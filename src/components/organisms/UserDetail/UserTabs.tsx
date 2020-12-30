import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Box, Grid, Tabs, Tab, Typography } from '@material-ui/core'

import { UserDetail, ReviewDetail, User } from '../../../@types'
import { ReviewCard } from '../../molecules/ReviewCard/'
import { ProductCardS } from '../../molecules/ProductCardS/'

interface Props {
    user: UserDetail
    follow: (user: User) => void
    unfollow: (user: User) => void
    setConfirmOpen: (value: boolean) => void
    editReview: (value: ReviewDetail) => void
    comment: string | null
    setComment: (value: string) => void
    postComment: (review: ReviewDetail) => void
    likeReview: (review: ReviewDetail) => void
    unlikeReview: (review: ReviewDetail) => void
    commentOpen: number | false
    setCommentOpen: (value: number | false) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
        list: {
            '&::after': {
                content: "''",
                flex: 'auto',
            },
        },
    }),
)

const TabPanel: FC<TabPanelProps> = ({ children, index, value }) => {
    return (
        <div hidden={value !== index}>
            {value === index && <Box p={2}>{children}</Box>}
        </div>
    )
}

export const UserTabs: FC<Props> = props => {
    const classes = useStyles(props.className)
    const [value, setValue] = useState<number>(0)

    return (
        <Card className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <Tabs
                    value={value}
                    onChange={(ev, newValue) => setValue(newValue)}
                >
                    <Tab
                        label={`行った公演 ${props.user.reviews_count || 0}`}
                    />
                    <Tab
                        label={`行きたい公演 ${props.user.wannas_count || 0}`}
                    />
                    <Tab
                        label={`LIKEした投稿 ${
                            props.user.like_reviews_id.length || 0
                        }`}
                    />
                </Tabs>
            </Grid>
            <TabPanel value={value} index={0}>
                {props.user.reviews_count !== 0 && props.user.reviews && (
                    <Grid
                        container
                        justify="space-between"
                        className={classes.list}
                    >
                        {props.user.reviews.slice(0, 12).map(review => (
                            <ProductCardS
                                key={review.product.id}
                                product={review.product}
                            />
                        ))}
                    </Grid>
                )}
                {props.user.reviews_count === 0 && (
                    <Typography>まだ行った公演はありません</Typography>
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.user.wannas_count !== 0 && props.user.wannas && (
                    <Grid
                        container
                        justify="space-between"
                        className={classes.list}
                    >
                        {props.user.wannas.slice(0, 12).map(wanna => (
                            <ProductCardS
                                key={wanna.product.id}
                                product={wanna.product}
                            />
                        ))}
                    </Grid>
                )}
                {props.user.wannas_count === 0 && (
                    <Typography>まだ行きたい公演はありません</Typography>
                )}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {props.user.like_reviews_count !== 0 &&
                    props.user.review_likes && (
                        <Box>
                            {props.user.review_likes.slice(0, 12).map(like_review => (
                                <ReviewCard
                                    key={like_review.review.id}
                                    review={like_review.review}
                                    reviewerProfile
                                    cardActionArea
                                    productTitle
                                    productCard
                                    edit={props.editReview}
                                    setConfirmOpen={props.setConfirmOpen}
                                    follow={props.follow}
                                    unfollow={props.unfollow}
                                    comment={props.comment}
                                    setComment={props.setComment}
                                    postComment={props.postComment}
                                    likeReview={props.likeReview}
                                    unlikeReview={props.unlikeReview}
                                    open={props.commentOpen}
                                    setOpen={props.setCommentOpen}
                                />
                            ))}
                        </Box>
                    )}
                {props.user.like_reviews_count === 0 && (
                    <Typography>まだLIKEした投稿はありません</Typography>
                )}
            </TabPanel>
        </Card>
    )
}
