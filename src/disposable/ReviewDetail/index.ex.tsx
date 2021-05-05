import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ReviewDetail as ReviewDetailInterface, User } from '../../@types'
import {
    asyncDeleteReview,
    asyncGetReview,
    asyncGetSpoiledContents,
    asyncLikeReview,
    asyncPostComment,
    asyncUnlikeReview,
    asyncUpdateReview,
} from '../../ajax/review'
import { asyncFollow, asyncUnFollow } from '../../ajax/user'
import { asyncGetCurrentUser } from '../../ajax/auth'
import { RootState, useAppDispatch } from '../../stores/index'
import { setMessage, setPopper } from '../../stores/error'
import { setUser } from '../../stores/auth'

import { ReviewDetail as ReviewDetailTemp } from './layout.ex'
import { CircularLoader } from '../../handlers/Loader/CircularLoader'

export const ReviewDetail: FC = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const history = useHistory()

    const [review, setReview] = useState<ReviewDetailInterface | null>(null)

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [spoil, setSpoil] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<Date | null>(null)
    const [contents, setContents] = useState<string | null>(null)
    const [comment, setComment] = useState<string | null>('')

    const [open, setOpen] = useState<boolean>(false)

    const getReview = () => {
        dispatch(asyncGetReview(id)).then(
            result => setReview(result)
        ).catch(() => {return})
    }

    const follow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review?.user) return false

        // 楽観的更新
        dispatch(
            setUser(
                Object.assign({}, currentUser, {
                    follows_id: currentUser.follows_id.concat([review.user.id]),
                }),
            ),
        )

        dispatch(asyncFollow(review.user.id))
            .then(() => dispatch(asyncGetCurrentUser()))
            .catch(() => {return})
    }

    const unfollow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review?.user) return false

        // 楽観的更新
        const follows_id = currentUser.follows_id.filter(el => {
            return el !== review.user.id
        })
        dispatch(
            setUser(Object.assign({}, currentUser, { follows_id: follows_id })),
        )

        dispatch(asyncUnFollow(review.user.id))
            .then(() => dispatch(asyncGetCurrentUser()))
            .catch(() => {return})
    }

    const edit = () => {
        if (!review) return false // 仮
        setRating(review.rating)
        setResult(review.result)
        setJoined_at(review.joined_at ? new Date(review.joined_at) : null)
        setContents(review.exposed_contents)
        setSpoil(review.spoil)
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
                joined_at?.toISOString() || null,
                contents,
            ),
        )
            .then(() => history.push(`/products/${review?.product_id}`))
            .catch(() => {return})
    }

    const deleteReview = () => {
        if (!review) return false // 仮
        dispatch(asyncDeleteReview(review.id))
            .then(() => history.push(`/products/${review?.product_id}`))
            .catch(() => {return})
    }

    const postComment = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!comment) {
            dispatch(setMessage({ errors: { comment: '入力してください' } }))
            return false
        }
        if (!review) return false // 仮
        dispatch(asyncPostComment(review.id, comment))
            .then(() => getReview())
            .catch(() => {return})
    }

    const likeReview = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮

        // 楽観的更新 (currentUser.like_reviews_idにプラス&該当のreview.review_likes_countに+1)
        dispatch(
            setUser(
                Object.assign({}, currentUser, {
                    like_reviews_id: currentUser.like_reviews_id.concat([
                        review.id,
                    ]),
                }),
            ),
        )
        setReview(
            Object.assign({}, review, {
                review_likes_count: review.review_likes_count + 1,
            }),
        )

        dispatch(asyncLikeReview(review.id))
            .then(() => {
                dispatch(asyncGetCurrentUser())
                getReview()
            })
            .catch(() => {return})
    }

    const unlikeReview = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮

        // 楽観的更新 (currentUser.like_reviews_idから削除&該当のreview.review_likes_countに-1)
        const like_reviews_id = currentUser.like_reviews_id.filter(el => {
            return el !== review.id
        })
        dispatch(
            setUser(
                Object.assign({}, currentUser, {
                    like_reviews_id: like_reviews_id,
                }),
            ),
        )
        setReview(
            Object.assign({}, review, {
                review_likes_count: review.review_likes_count - 1,
            }),
        )

        dispatch(asyncUnlikeReview(review.id))
            .then(() => {
                dispatch(asyncGetCurrentUser())
                getReview()
            })
            .catch(() => {return})
    }

    const getSpoiledContents = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮
        if (!currentUser.done_id.includes(review.product.id)) {
            dispatch(setPopper('undone'))
            return false
        }
        dispatch(asyncGetSpoiledContents(review.id)).then(
            result => setReview(result)
        ).catch(() => {return})
    }

    useEffect(() => {
        getReview()
    }, [])

    return (
        <>
            <Helmet>
                <title>レビュー - なぞログ</title>
            </Helmet>
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
            {!review && <CircularLoader />}
        </>
    )
}
