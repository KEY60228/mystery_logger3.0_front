import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

import { ReviewIndex, ReviewDetail, User } from '../../@types'
import {
    asyncDeleteReview,
    asyncGetTimeline,
    asyncLikeReview,
    asyncPostComment,
    asyncUnlikeReview,
    asyncUpdateReview,
} from '../../ajax/review'
import { asyncFollow, asyncUnFollow } from '../../ajax/user'
import { asyncGetCurrentUser } from '../../ajax/auth'
import { RootState, useAppDispatch } from '../../stores/index'
import { setPopper } from '../../stores/error'
import { setUser } from '../../stores/auth'

import { CircularLoader } from '../../_reusable/Loader/CircularLoader'
import { TimelineTemplate as Template } from './layout.ex'

export const Timeline: FC = () => {
    const dispatch = useAppDispatch()

    const currentUser = useSelector((state: RootState) => state.auth.user)
    const [reviews, setReviews] = useState<ReviewIndex[] | null>(null)
    const [review, setReview] = useState<ReviewDetail | null>(null)

    const [spoil, setSpoil] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<Date | null>(null)
    const [contents, setContents] = useState<string | null>('')
    const [comment, setComment] = useState<string | null>('')

    // 投稿フォームの開閉
    const [open, setOpen] = useState<boolean>(false)

    const getReviews = async () => {
        dispatch(asyncGetTimeline()).then(
            result => setReviews(result)
        ).catch(() => {return})
    }

    const edit = (review: ReviewDetail) => {
        if (!review) return false // 仮
        setReview(review)
        setRating(review.rating)
        setResult(review.result)
        setJoined_at(review.joined_at ? new Date(review.joined_at) : null)
        setSpoil(review.spoil)
        setContents(review.exposed_contents)
        setOpen(true)
    }

    const update = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮
        dispatch(
            asyncUpdateReview(
                review.id,
                spoil,
                rating,
                result,
                joined_at?.toISOString() || null,
                contents,
            ),
        )
            .then(() => {
                getReviews()
                setReview(null)
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at(null)
                setContents('')
            })
            .catch(() => {return})
    }

    const deleteReview = () => {
        if (!review) return false // 仮
        dispatch(asyncDeleteReview(review.id))
            .then(() => {
                getReviews()
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at(null)
                setContents('')
            })
            .catch(() => {return})
    }

    const follow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!user) return false // 仮

        // 楽観的更新
        dispatch(
            setUser(
                Object.assign({}, currentUser, {
                    follows_id: currentUser.follows_id.concat([user.id]),
                }),
            ),
        )

        dispatch(asyncFollow(user.id))
            .then(() => dispatch(asyncGetCurrentUser()))
            .catch(() => {return})
    }

    const unfollow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!user) return false // 仮

        // 楽観的更新
        const follows_id = currentUser.follows_id.filter(el => {
            return el !== user.id
        })
        dispatch(
            setUser(Object.assign({}, currentUser, { follows_id: follows_id })),
        )

        dispatch(asyncUnFollow(user.id))
            .then(() => dispatch(asyncGetCurrentUser()))
            .catch(() => {return})
    }

    const postComment = (review: ReviewIndex) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review || !comment) return false // 仮
        dispatch(asyncPostComment(review.id, comment))
            .then(() => getReviews())
            .catch(() => {return})
    }

    const likeReview = (review: ReviewIndex) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review || !reviews) return false // 仮

        // 楽観的更新 (currentUser.like_reviews_idにプラス&該当のreview.review_likes_countに+1)
        dispatch(
            setUser(
                Object.assign({}, currentUser, {
                    like_reviews_id: currentUser.like_reviews_id.concat([
                        review.id,
                    ]),
                }),
            ),
        )
        const tmp = reviews.map(el => {
            if (el.id === review.id) {
                const num = el.review_likes_count
                return Object.assign({}, el, { review_likes_count: num + 1 })
            }
            return el
        })
        setReviews(tmp)

        dispatch(asyncLikeReview(review.id))
            .then(() => {
                dispatch(asyncGetCurrentUser())
                getReviews()
            })
            .catch(() => {return})
    }

    const unlikeReview = (review: ReviewIndex) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review || !reviews) return false // 仮

        // 楽観的更新 (currentUser.like_reviews_idから削除&該当のreview.review_likes_countに-1)
        const like_reviews_id = currentUser.like_reviews_id.filter(el => {
            return el !== review.id
        })
        dispatch(
            setUser(
                Object.assign({}, currentUser, {
                    like_reviews_id: like_reviews_id,
                }),
            ),
        )
        const tmp = reviews.map(el => {
            if (el.id === review.id) {
                const num = el.review_likes_count
                return Object.assign({}, el, { review_likes_count: num - 1 })
            }
            return el
        })
        setReviews(tmp)

        dispatch(asyncUnlikeReview(review.id))
            .then(() => {
                dispatch(asyncGetCurrentUser())
                getReviews()
            })
            .catch(() => {return})
    }

    useEffect(() => {
        getReviews()
    }, [])

    return (
        <>
            <Helmet>
                <title>タイムライン - なぞログ</title>
            </Helmet>
            {reviews && (
                <>
                    <Template
                        reviews={reviews}
                        review={review}
                        open={open}
                        setOpen={setOpen}
                        rating={rating}
                        setRating={setRating}
                        result={result}
                        setResult={setResult}
                        joined_at={joined_at}
                        setJoined_at={setJoined_at}
                        spoil={spoil}
                        setSpoil={setSpoil}
                        contents={contents}
                        setContents={setContents}
                        edit={edit}
                        update={update}
                        follow={follow}
                        unfollow={unfollow}
                        deleteReview={deleteReview}
                        comment={comment}
                        setComment={setComment}
                        postComment={postComment}
                        likeReview={likeReview}
                        unlikeReview={unlikeReview}
                    />
                </>
            )}
            {!reviews && <CircularLoader />}
        </>
    )
}
