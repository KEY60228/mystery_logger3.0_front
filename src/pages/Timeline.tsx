import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { RootState } from '../stores/index'
import { ReviewDetail } from '../@types'
import { Timeline as TimelineTemp } from '../templates/Timeline'
import { ReviewForm } from '../organisms/ReviewForm'

export const Timeline: FC = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [open, setOpen] = useState<boolean>(false)

    const [reviews, setReviews] = useState<ReviewDetail[]|null>(null)
    const getReviews = async() => {
        await axios.get(
            'https://localhost:1443/v1/reviews',
            {
                params: {
                    user_id: user?.id // 仮
                }
            }
        ).then((response) => {
            setReviews(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string|null>('')
    const [contents, setContents] = useState<string|null>('')
    
    const [review, setReview] = useState<ReviewDetail|null>(null)
    const edit = async() => {
        const data = {
            rating: rating,
            result: result,
            joined_at: joined_at,
            contents: contents,
            user_id: user?.id, // 仮
            product_id: review?.product.id, // 仮
            clear_time: null,
        }

        await axios.put(
            `https://localhost:1443/v1/reviews/${review?.id}`,
            data
        ).then((response) => {
            if (response.status === 201) {
                console.log(response.data)
            }
            setOpen(false)
            getReviews()
            setRating(0)
            setResult(0)
            setJoined_at('')
            setContents('')
        }).catch((error) =>
            console.log(error)
        )
    }

    const [isEdit, setIsEdit] = useState<boolean>(false)

    useEffect(() => {
        getReviews()
    }, [])
    
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
                        setReview={setReview}
                        setIsEdit={setIsEdit}
                        setReviewId={() => console.log()} // 仮
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