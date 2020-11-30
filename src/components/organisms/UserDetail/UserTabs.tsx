import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Box, Grid, Tabs, Tab, Typography } from '@material-ui/core'

import {
    UserDetail,
    ReviewDetail,
    ReviewWithProduct,
    User,
    WannaWithProduct,
    ReviewLikeDetail,
} from '../../../@types'
import { ReviewCard } from '../../molecules/ReviewCard/'
import { ProductCardS } from '../../molecules/ProductCardS/'

interface Props {
    user: UserDetail
    follow: (user: User) => void
    unfollow: (user: User) => void
    setConfirmOpen: (value: boolean) => void
    editReview: () => void
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

export const UserTabs: FC<Props> = ({
    user,
    follow,
    unfollow,
    setConfirmOpen,
    editReview,
    comment,
    setComment,
    postComment,
    likeReview,
    unlikeReview,
    commentOpen,
    setCommentOpen,
    className,
}) => {
    const classes = useStyles(className)
    const [value, setValue] = useState<number>(0)

    return (
        <Card className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <Tabs
                    value={value}
                    onChange={(ev, newValue) => setValue(newValue)}
                >
                    <Tab label={`行った公演 ${user.reviews_count || 0}`} />
                    <Tab label={`行きたい公演 ${user.wannas_count || 0}`} />
                    <Tab
                        label={`LIKEした投稿 ${
                            user.like_reviews_id.length || 0
                        }`}
                    />
                </Tabs>
            </Grid>
            <TabPanel value={value} index={0}>
                {user.reviews_count !== 0 && user.reviews && (
                    <Grid
                        container
                        justify="space-between"
                        className={classes.list}
                    >
                        {user.reviews.map((review: ReviewWithProduct) => (
                            <ProductCardS
                                key={review.product.id}
                                product={review.product}
                            />
                        ))}
                    </Grid>
                )}
                {user.reviews_count === 0 && (
                    <Typography>まだ行った公演はありません</Typography>
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {user.wannas_count !== 0 && user.wannas && (
                    <Grid
                        container
                        justify="space-between"
                        className={classes.list}
                    >
                        {user.wannas.map((wanna: WannaWithProduct) => (
                            <ProductCardS
                                key={wanna.product.id}
                                product={wanna.product}
                            />
                        ))}
                    </Grid>
                )}
                {user.wannas_count === 0 && (
                    <Typography>まだ行きたい公演はありません</Typography>
                )}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {user.review_likes && (
                    <Box>
                        {user.review_likes.map(
                            (like_review: ReviewLikeDetail) => (
                                <ReviewCard
                                    key={like_review.review.id}
                                    review={like_review.review}
                                    reviewerProfile
                                    cardActionArea
                                    productTitle
                                    productCard
                                    edit={editReview}
                                    setConfirmOpen={setConfirmOpen}
                                    follow={follow}
                                    unfollow={unfollow}
                                    comment={comment}
                                    setComment={setComment}
                                    postComment={postComment}
                                    likeReview={likeReview}
                                    unlikeReview={unlikeReview}
                                    open={commentOpen}
                                    setOpen={setCommentOpen}
                                />
                            ),
                        )}
                    </Box>
                )}
                {!user.review_likes && (
                    <Typography>まだLIKEした投稿はありません</Typography>
                )}
            </TabPanel>
        </Card>
    )
}
