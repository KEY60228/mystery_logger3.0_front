import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../stores/index'
import { ReviewDetail as ReviewDetailTemp } from '../components/templates/ReviewDetail'
import { asyncGetReview } from '../ajax/review'

export const ReviewDetail: FC = () => {
    interface Params {
        id: string
    }
    const { id } = useParams<Params>()
    const dispatch = useDispatch()

    const review = useSelector((state: RootState) => state.review.focusedReview)

    const getReview = () => {
        dispatch(asyncGetReview(id))
    }

    useEffect(() => {
        getReview()
    }, [])

    return (
        <>
            {review && <ReviewDetailTemp review={review} />}
            {!review && <div>loading</div>}
        </>
    )
}
