import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { User } from '../@types'
import { RootState } from '../stores/index'
import { setFocusedReview } from '../stores/review'
import { ReviewDetail as ReviewDetailTemp } from '../components/templates/ReviewDetail'
import { asyncGetReview, asyncUpdateReview } from '../ajax/review'
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

    const [open, setOpen] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>('')
    const [contents, setContents] = useState<string | null>('')

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

    const edit = () => {
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

    return (
        <>
            {review && 
                <>
                    <ReviewDetailTemp review={review} edit={edit} follow={follow} unfollow={unfollow} />
                    <ReviewForm
                        open={open}
                        setOpen={setOpen}
                        rating={review.rating}
                        setRating={setRating}
                        result={review.result}
                        setResult={setResult}
                        joined_at={review.joined_at}
                        setJoined_at={setJoined_at}
                        contents={review.contents}
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
