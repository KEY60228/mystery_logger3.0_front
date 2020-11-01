import React, { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../stores/index'
import { ReviewDetail } from '../@types'
import { Timeline as TimelineTemp } from '../templates/Timeline'
import { ReviewForm } from '../organisms/ReviewForm'
import { asyncGetTimeline, asyncUpdateReview } from '../ajax/review'

export const Timeline: FC = () => {
    const dispatch = useDispatch()
    
    const apiStatus = useSelector((state: RootState) => state.error.apiStatus)
    const postStatus = useSelector((state: RootState) => state.review.postStatus)
    const user = useSelector((state: RootState) => state.auth.user)
    const review = useSelector((state: RootState) => state.review.focusedReview)

    const [open, setOpen] = useState<boolean>(false)
    const [reviews, setReviews] = useState<ReviewDetail[]|null>(null)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string|null>('')
    const [contents, setContents] = useState<string|null>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const getReviews = async() => {
        dispatch(asyncGetTimeline(user?.id, setReviews))
    }
    const edit = () => {
        dispatch(asyncUpdateReview(rating, result, joined_at, contents, user?.id, review?.product.id, review?.id))
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
            { reviews &&
                <>
                    <TimelineTemp
                        reviews={reviews}
                        setOpen={setOpen}
                        setRating={setRating}
                        setResult={setResult}
                        setJoined_at={setJoined_at}
                        setContents={setContents}
                        setIsEdit={setIsEdit}
                    />
                    { review &&
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
                            edit={edit}
                            isEdit={isEdit}
                            product={review.product}
                        />
                    }
                </>
            }
            { !reviews &&
                <div>loading</div>
            }
        </>
    )
}