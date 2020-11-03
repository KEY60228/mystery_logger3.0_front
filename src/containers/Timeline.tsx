import React, { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../stores/index'
import { ReviewDetail } from '../@types'
import { Timeline as TimelineTemp } from '../components/templates/Timeline'
import { ReviewForm } from '../components/templates/ReviewForm'
import { asyncGetTimeline, asyncUpdateReview } from '../ajax/review'
import { setFocusedReview } from '../stores/review'

export const Timeline: FC = () => {
    const dispatch = useDispatch()

    const apiStatus = useSelector((state: RootState) => state.error.apiStatus)
    const postStatus = useSelector(
        (state: RootState) => state.review.postStatus,
    )
    const user = useSelector((state: RootState) => state.auth.user)
    const review = useSelector((state: RootState) => state.review.focusedReview)

    const [open, setOpen] = useState<boolean>(false)
    const [reviews, setReviews] = useState<ReviewDetail[] | null>(null)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>('')
    const [contents, setContents] = useState<string | null>('')

    const getReviews = async () => {
        dispatch(asyncGetTimeline(user?.id, setReviews))
    }

    const edit = (review: ReviewDetail) => {
        dispatch(setFocusedReview(review))
        if (!review) return false
        setRating(review.rating)
        setResult(review.result)
        setJoined_at(review.joined_at)
        setContents(review.contents)
        setOpen(true)
    }

    const update = () => {
        if (!user || !review) return false
        dispatch(
            asyncUpdateReview(
                rating,
                result,
                joined_at,
                contents,
                user.id,
                review.product.id,
                review.id,
            ),
        )
    }

    useEffect(() => {
        getReviews()
    }, [])

    useEffect(() => {
        if (postStatus) {
            getReviews()
            setOpen(false)
            setRating(0)
            setResult(0)
            setJoined_at('')
            setContents('')
        }
    }, [postStatus])

    return (
        <>
            {reviews && (
                <>
                    <TimelineTemp reviews={reviews} edit={edit} />
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
