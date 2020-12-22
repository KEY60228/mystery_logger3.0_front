import React, { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ReviewIndex, User } from '../@types'
import {
    asyncDeleteReview,
    asyncGetTimeline,
    asyncLikeReview,
    asyncPostComment,
    asyncUnlikeReview,
    asyncUpdateReview,
} from '../ajax/review'
import { asyncFollow, asyncUnFollow } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { RootState, useAppDispatch } from '../stores/index'
import { setFocusedReview } from '../stores/review'
import { Timeline as TimelineTemp } from '../components/templates/Timeline'
import { setPopper } from '../stores/error'
import { CircularLoader } from '../Loader/CircularLoader'
import { setUser } from '../stores/auth'

export const Timeline: FC = () => {
    const dispatch = useAppDispatch()

    const currentUser = useSelector((state: RootState) => state.auth.user)
    const review = useSelector((state: RootState) => state.review.focusedReview) // 要確認

    const [spoil, setSpoil] = useState<boolean>(false)
    const [reviews, setReviews] = useState<ReviewIndex[] | null>(null)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<Date | null>(null)
    const [contents, setContents] = useState<string | null>('')
    const [comment, setComment] = useState<string | null>('')

    // 投稿フォームの開閉
    const [open, setOpen] = useState<boolean>(false)

    const getReviews = async () => {
        dispatch(asyncGetTimeline(setReviews))
    }

    const edit = () => {
        if (!review) return false // 仮
        setRating(review.rating)
        setResult(review.result)
        setJoined_at(review.joined_at ? new Date(review.joined_at) : null)
        setContents(review.contents)
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
        ).then(
            () => {
                getReviews()
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at(null)
                setContents('')
            }
        ).catch(

        )
    }

    const deleteReview = () => {
        if (!review) return false // 仮
        dispatch(asyncDeleteReview(review.id)).then(
            () => {
                getReviews()
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at(null)
                setContents('')
            }
        ).catch(

        )
    }

    const follow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!user) return false // 仮

        // 楽観的更新
        dispatch(setUser(Object.assign({}, currentUser, {follows_id: currentUser.follows_id.concat([user.id])})))

        dispatch(asyncFollow(user.id)).then(
            () => dispatch(asyncGetCurrentUser())
        ).catch(

        )
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
        dispatch(setUser(Object.assign({}, currentUser, {follows_id: follows_id})))

        dispatch(asyncUnFollow(user.id)).then(
            () => dispatch(asyncGetCurrentUser())
        ).catch(

        )
    }

    const postComment = (review: ReviewIndex) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review || !comment) return false // 仮
        dispatch(asyncPostComment(review.id, comment)).then(
            () => getReviews()
        ).catch(

        )
    }

    const likeReview = (review: ReviewIndex) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review || !reviews) return false // 仮

        // 楽観的更新 (currentUser.like_reviews_idにプラス&該当のreview.review_likes_countに+1)
        dispatch(setUser(Object.assign({}, currentUser, {like_reviews_id: currentUser.like_reviews_id.concat([review.id])})))
        const tmp = reviews.map(el => {
            if (el.id === review.id) {
                const num = el.review_likes_count
                return Object.assign({}, el, {review_likes_count: num + 1})
            }
            return el
        })
        setReviews(tmp)

        dispatch(asyncLikeReview(review.id)).then(
            () => {
                dispatch(asyncGetCurrentUser())
                getReviews()
            }
        ).catch(

        )
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
        dispatch(setUser(Object.assign({}, currentUser, {like_reviews_id: like_reviews_id})))
        const tmp = reviews.map(el => {
            if (el.id === review.id) {
                const num = el.review_likes_count
                return Object.assign({}, el, {review_likes_count: num - 1})
            }
            return el
        })
        setReviews(tmp)

        dispatch(asyncUnlikeReview(review.id)).then(
            () => {
                dispatch(asyncGetCurrentUser())
                getReviews()
            }
        ).catch(

        )
    }

    useEffect(() => {
        getReviews()

        return () => {
            dispatch(setFocusedReview(null))
        }
    }, [])

    return (
        <>
            {reviews && (
                <>
                    <TimelineTemp
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
