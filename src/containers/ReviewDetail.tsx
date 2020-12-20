import React, { FC, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ReviewDetail as ReviewDetailInterface, User } from '../@types'
import {
    asyncDeleteReview,
    asyncGetReview,
    asyncGetSpoiledContents,
    asyncLikeReview,
    asyncPostComment,
    asyncUnlikeReview,
    asyncUpdateReview,
} from '../ajax/review'
import { asyncFollow, asyncUnFollow } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { RootState, useAppDispatch } from '../stores/index'
import { ReviewDetail as ReviewDetailTemp } from '../components/templates/ReviewDetail'
import { setPopper } from '../stores/error'

export const ReviewDetail: FC = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const history = useHistory()

    const [review, setReview] = useState<ReviewDetailInterface | null>(null)

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [spoil, setSpoil] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>(null)
    const [contents, setContents] = useState<string | null>(null)
    const [comment, setComment] = useState<string | null>('')

    const [open, setOpen] = useState<boolean>(false)

    const getReview = () => {
        dispatch(asyncGetReview(id, setReview))
    }

    const follow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review?.user) return false
        dispatch(asyncFollow(review.user.id)).then(
            () => dispatch(asyncGetCurrentUser())
        ).catch(

        )
    }

    const unfollow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review?.user) return false
        dispatch(asyncUnFollow(review.user.id)).then(
            () => dispatch(asyncGetCurrentUser())
        ).catch(

        )
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
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮
        dispatch(
            asyncUpdateReview(
                review.id,
                spoil,
                rating,
                result,
                joined_at,
                contents,
            ),
        ).then(
            () => history.push(`/products/${review?.product_id}`)
        ).catch(

        )
    }

    const deleteReview = () => {
        if (!review) return false // 仮
        dispatch(asyncDeleteReview(review.id)).then(
            () => history.push(`/products/${review?.product_id}`)
        ).catch(

        )
    }

    const postComment = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review || !comment) return false // 仮
        dispatch(asyncPostComment(review.id, comment)).then(
            () => getReview()
        ).catch(

        )
    }

    const likeReview = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮
        dispatch(asyncLikeReview(review.id)).then(
            () => {
                dispatch(asyncGetCurrentUser())
                getReview()
            }
        ).catch(

        )
    }

    const unlikeReview = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮
        dispatch(asyncUnlikeReview(review.id)).then(
            () => {
                dispatch(asyncGetCurrentUser())
                getReview()
            }
        ).catch(

        )
    }

    const getSpoiledContents = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮
        if (!currentUser.done_id.includes(review.id)) {
            dispatch(setPopper('undone'))
            return false
        }
        dispatch(asyncGetSpoiledContents(review.id, setReview)).then(

        ).catch(

        )
    }

    useEffect(() => {
        getReview()
    }, [])

    return (
        <>
            {review && (
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
                    spoil={spoil}
                    setSpoil={setSpoil}
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
                    getSpoiledContents={getSpoiledContents}
                />
            )}
            {!review && <div>loading</div>}
        </>
    )
}
