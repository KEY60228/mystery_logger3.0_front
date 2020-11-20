import React, { FC, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { User } from '../@types'
import { asyncDeleteReview, asyncGetReview, asyncUpdateReview } from '../ajax/review'
import { asyncFollow, asyncUnFollow } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { RootState } from '../stores/index'
import { setFocusedReview } from '../stores/review'
import { ReviewDetail as ReviewDetailTemp } from '../components/templates/ReviewDetail'

export const ReviewDetail: FC = () => {
    const { id } = useParams<{id: string}>()
    const dispatch = useDispatch()
    const history = useHistory()

    const currentUser = useSelector((state: RootState) => state.auth.user)
    const review = useSelector((state: RootState) => state.review.focusedReview)
    const followStatus = useSelector((state: RootState) => state.user.followStatus)
    const postStatus = useSelector((state: RootState) => state.review.postStatus)

    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>(null)
    const [contents, setContents] = useState<string | null>(null)

    const [open, setOpen] = useState<boolean>(false)

    const getReview = () => {
        dispatch(asyncGetReview(id))
    }

    const follow = (user: User) => { // 要確認
        if (!currentUser || !review?.user) return false
        dispatch(asyncFollow(currentUser.id, review.user.id))
    }
    
    const unfollow = (user: User) => { // 要確認
        if(!currentUser || !review?.user) return false
        dispatch(asyncUnFollow(currentUser.id, review.user.id))
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
        )
    }

    const deleteReview = () => {
        if (!review) return false
        dispatch(asyncDeleteReview(review.id))
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

    useEffect(() => {
        if (postStatus) {
            history.push(`/products/${review?.product_id}`)
        }
    }, [postStatus])

    return (
        <>
            {review && 
                <ReviewDetailTemp
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
                />
            }
            {!review && <div>loading</div>}
        </>
    )
}
