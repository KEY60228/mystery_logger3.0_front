import React, { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../stores/index'
import { ReviewDetail, User } from '../@types'
import { Timeline as TimelineTemp } from '../components/templates/Timeline'
import { ReviewForm } from '../components/templates/ReviewForm'
import { asyncGetTimeline, asyncUpdateReview } from '../ajax/review'
import { asyncFollow, asyncUnFollow } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { setFocusedReview, setPostStatus } from '../stores/review'
import { setFollowStatus } from '../stores/user'
import { setFocusedProduct } from '../stores/product'

export const Timeline: FC = () => {
    const dispatch = useDispatch()

    const [reviews, setReviews] = useState<ReviewDetail[] | null>(null)

    const postStatus = useSelector(
        (state: RootState) => state.review.postStatus,
    )
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const review = useSelector((state: RootState) => state.review.focusedReview)
    const followStatus = useSelector((state: RootState) => state.user.followStatus)

    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>('')
    const [contents, setContents] = useState<string | null>('')

    // 投稿フォームの開閉
    const [open, setOpen] = useState<boolean>(false)

    const getReviews = async () => {
        if (!currentUser) return false
        dispatch(asyncGetTimeline(currentUser.id, setReviews))
    }

    const edit = (review: ReviewDetail) => {
        if (!review) return false
        dispatch(setFocusedReview(review))
        setRating(review.rating)
        setResult(review.result)
        setJoined_at(review.joined_at)
        setContents(review.contents)
        setOpen(true)
    }

    const update = () => {
        if (!currentUser || !review) return false
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
        )
    }

    const follow = (user: User) => {
        if (!currentUser || !user) return false
        dispatch(asyncFollow(currentUser.id, user.id))
    }
    
    const unfollow = (user: User) => {
        if(!currentUser || !user) return false
        dispatch(asyncUnFollow(currentUser.id, user.id))
    }

    useEffect(() => {
        getReviews()

        return () => {
            dispatch(setFocusedReview(null))
            dispatch(setFocusedProduct(null))
        }
    }, [])

    useEffect(() => {
        if (postStatus) {
            getReviews()
            setOpen(false)
            setRating(0)
            setResult(0)
            setJoined_at('')
            setContents('')
            dispatch(setPostStatus(null))
        }
    }, [postStatus])

    useEffect(() => {
        if (followStatus) {
            dispatch(asyncGetCurrentUser())
            dispatch(setFollowStatus(null))
        }
    }, [followStatus])

    return (
        <>
            {reviews && (
                <>
                    <TimelineTemp reviews={reviews} edit={edit} follow={follow} unfollow={unfollow} />
                    {review && (
                        <ReviewForm
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
                            update={update}
                            isNew={false}
                            product={review.product}
                        />
                    )}
                </>
            )}
            {!reviews && <div>loading</div>}
        </>
    )
}
