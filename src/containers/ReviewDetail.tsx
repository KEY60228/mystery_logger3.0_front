import React, { FC, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ReviewDetail as ReviewDetailInterface, User } from '../@types'
import { RootState } from '../stores/index'
import { setFocusedReview } from '../stores/review'
import { ReviewDetail as ReviewDetailTemp } from '../components/templates/ReviewDetail'
import { asyncDeleteReview, asyncGetReview, asyncUpdateReview } from '../ajax/review'
import { asyncFollow, asyncUnFollow } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { setFollowStatus } from '../stores/user'
import { setFocusedProduct } from '../stores/product'
import { ReviewForm } from '../components/templates/ReviewForm'

export const ReviewDetail: FC = () => {
    interface Params {
        id: string
    }
    const { id } = useParams<Params>()
    const dispatch = useDispatch()
    const history = useHistory()

    const review = useSelector((state: RootState) => state.review.focusedReview)
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const followStatus = useSelector((state: RootState) => state.user.followStatus)
    const postStatus = useSelector((state: RootState) => state.review.postStatus)

    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>(null)
    const [contents, setContents] = useState<string | null>(null)

    const [open, setOpen] = useState<boolean>(false)
    const setModalOpen = (value: boolean) => {
        if (value) {
            if (!review) return false
            setRating(review.rating)
            setResult(review.result)
            setJoined_at(review.joined_at)
            setContents(review.contents)
        }
        setOpen(value)
    }
    
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

    const edit = () => {
        setModalOpen(true)
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

    const deleteReview = () => {
        if (!review) return false
        dispatch(asyncDeleteReview(review.id))
    }

    useEffect(() => {
        getReview()

        return () => {
            dispatch(setFocusedReview(null))
            dispatch(setFocusedProduct(null))
        }
    }, [])

    useEffect(() => {
        if (followStatus) {
            dispatch(asyncGetCurrentUser())
            dispatch(setFollowStatus(null))
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
                <>
                    <ReviewDetailTemp review={review} edit={edit} follow={follow} unfollow={unfollow} deleteReview={deleteReview} />
                    <ReviewForm
                        open={open}
                        setOpen={setModalOpen}
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
                </>
            }
            {!review && <div>loading</div>}
        </>
    )
}
