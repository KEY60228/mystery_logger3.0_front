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

export const Timeline: FC = () => {
    const dispatch = useAppDispatch()

    const currentUser = useSelector((state: RootState) => state.auth.user)
    const review = useSelector((state: RootState) => state.review.focusedReview) // 要確認

    const [spoil, setSpoil] = useState<boolean>(false)
    const [reviews, setReviews] = useState<ReviewIndex[] | null>(null)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>('')
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
        setJoined_at(review.joined_at)
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
                joined_at,
                contents,
            ),
        ).then(
            () => {
                getReviews()
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at('')
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
                setJoined_at('')
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
        if (!review) return false // 仮
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
        if (!review) return false // 仮
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
            {!reviews && <div>loading</div>}
        </>
    )
}
