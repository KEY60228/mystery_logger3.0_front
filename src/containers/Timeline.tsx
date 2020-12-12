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

export const Timeline: FC = () => {
    const dispatch = useAppDispatch()

    const currentUser = useSelector((state: RootState) => state.auth.user)
    const review = useSelector((state: RootState) => state.review.focusedReview) // 要確認
    const followStatus = useSelector(
        (state: RootState) => state.user.followStatus,
    )
    const commentStatus = useSelector(
        (state: RootState) => state.review.commentStatus,
    )
    const likeStatus = useSelector(
        (state: RootState) => state.review.likeStatus,
    )

    const [reviews, setReviews] = useState<ReviewIndex[] | null>(null)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>('')
    const [contents, setContents] = useState<string | null>('')
    const [comment, setComment] = useState<string | null>('')

    // 投稿フォームの開閉
    const [open, setOpen] = useState<boolean>(false)

    const getReviews = async () => {
        if (!currentUser) return false // 仮
        dispatch(asyncGetTimeline(currentUser.id, setReviews))
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
        if (!currentUser || !review) return false // 仮
        dispatch(
            asyncUpdateReview(
                rating,
                result,
                joined_at,
                contents,
                currentUser.id,
                review.product.id,
                review.id,
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
        dispatch(asyncDeleteReview(review.id))
    }

    const follow = (user: User) => {
        if (!currentUser || !user) return false // 仮
        dispatch(asyncFollow(currentUser.id, user.id))
    }

    const unfollow = (user: User) => {
        if (!currentUser || !user) return false // 仮
        dispatch(asyncUnFollow(currentUser.id, user.id))
    }

    const postComment = (review: ReviewIndex) => {
        if (!currentUser || !review || !comment) return false // 仮
        dispatch(asyncPostComment(currentUser.id, review.id, comment))
    }

    const likeReview = (review: ReviewIndex) => {
        if (!currentUser || !review) return false // 仮
        dispatch(asyncLikeReview(currentUser.id, review.id))
    }

    const unlikeReview = (review: ReviewIndex) => {
        if (!currentUser || !review) return false // 仮
        dispatch(asyncUnlikeReview(currentUser.id, review.id))
    }

    useEffect(() => {
        getReviews()

        return () => {
            dispatch(setFocusedReview(null))
        }
    }, [])

    useEffect(() => {
        if (followStatus) {
            dispatch(asyncGetCurrentUser())
        }
    }, [followStatus])

    useEffect(() => {
        if (commentStatus) {
            getReviews()
        }
    }, [commentStatus])

    useEffect(() => {
        if (likeStatus) {
            dispatch(asyncGetCurrentUser())
            getReviews()
        }
    }, [likeStatus])

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
