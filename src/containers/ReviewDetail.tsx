import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { User } from '../@types'
import { RootState } from '../stores/index'
import { setFocusedReview } from '../stores/review'
import { ReviewDetail as ReviewDetailTemp } from '../components/templates/ReviewDetail'
import { asyncGetReview } from '../ajax/review'
import { asyncFollow, asyncUnFollow } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'

export const ReviewDetail: FC = () => {
    interface Params {
        id: string
    }
    const { id } = useParams<Params>()
    const dispatch = useDispatch()

    const review = useSelector((state: RootState) => state.review.focusedReview)
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const followStatus = useSelector((state: RootState) => state.user.followStatus)

    const getReview = () => {
        dispatch(asyncGetReview(id))
    }

    const follow = (user: User) => {
        if (!currentUser || !review?.user) return false
        dispatch(asyncFollow(currentUser.id, review.user.id))
    }
    
    const unfollow = (user: User) => {
        if(!currentUser || !review?.user) return false
        dispatch(asyncUnFollow(currentUser.id, review.user.id))
    }

    useEffect(() => {
        getReview()

        return () => {
            dispatch(setFocusedReview(null))
        }
    }, [])

    useEffect(() => {
        if (followStatus) {
            dispatch(asyncGetCurrentUser())
        }
    }, [followStatus])

    return (
        <>
            {review && <ReviewDetailTemp review={review} follow={follow} unfollow={unfollow} />}
            {!review && <div>loading</div>}
        </>
    )
}
