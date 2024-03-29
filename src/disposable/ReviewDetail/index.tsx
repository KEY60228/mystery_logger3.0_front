import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Review, ReviewContents, ReviewDetail as ReviewDetailInterface, User } from '../../@types'
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

import { ReviewDetailTemplate as Template } from './layout'
import { CircularLoader } from '../../handlers/Loader/CircularLoader'

export const ReviewDetail: FC = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const history = useHistory()

    // ログインユーザー
    const currentUser = useSelector((state: RootState) => state.auth.user)

    // Review state
    const [review, setReview] = useState<ReviewDetailInterface | null>(null)

    // 投稿フォームのstate
    const [formOpen, setFormOpen] = useState<boolean>(false)

    // レビューのstate
    const [reviewContents, setReviewContents] = useState<ReviewContents>({
        spoil: false,
        rating: 0,
        result: 0,
        joined_at: null,
        contents: null,
    })

    // コメントのstate
    const [comment, setComment] = useState<string | null>('')

    const editReview = () => {
        if (!review) return false // 仮
        setReviewContents({
            rating: review.rating,
            result: review.result,
            joined_at: review.joined_at ? new Date(review.joined_at) : null,
            contents: review.exposed_contents,
            spoil: review.spoil,
        })
        setFormOpen(true)
    }

    const updateReview = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮
        dispatch(
            asyncUpdateReview(
                review.id,
                reviewContents.spoil,
                reviewContents.rating,
                reviewContents.result,
                reviewContents.joined_at?.toISOString() || null,
                reviewContents.contents,
            ),
        )
            .then(() => {
                getReview()
                dispatch(asyncGetCurrentUser())
                setFormOpen(false)
                setReviewContents({
                    spoil: false,
                    rating: 0,
                    result: 0,
                    joined_at: null,
                    contents: '',
                })
            })
            .catch(() => {return})
    }

    const deleteReview = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮
        dispatch(asyncDeleteReview(review.id))
            .then(() => history.push(`/products/${review?.product_id}`))
            .catch(() => {return})
    }

    const follow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }

        // 楽観的更新
        dispatch(
            setUser(
                Object.assign({}, currentUser, {
                    follows_id: currentUser.follows_id.concat([user.id]),
                }),
            ),
        )

        dispatch(asyncFollow(user.id))
            .then(() => dispatch(asyncGetCurrentUser()))
            .catch(() => {return})
    }

    const unfollow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }

        // 楽観的更新
        const follows_id = currentUser.follows_id.filter(el => {
            return el !== user.id
        })
        dispatch(
            setUser(Object.assign({}, currentUser, { follows_id: follows_id })),
        )

        dispatch(asyncUnFollow(user.id))
            .then(() => dispatch(asyncGetCurrentUser()))
            .catch(() => {return})
    }

    // const postComment = () => {
    //     if (!currentUser) {
    //         dispatch(setPopper('unauthenticated'))
    //         return false
    //     }
    //     if (!comment) {
    //         dispatch(setMessage({ errors: { comment: '入力してください' } }))
    //         return false
    //     }
    //     if (!review) return false
    //     dispatch(asyncPostComment(review.id, comment))
    //         .then(() => getReview())
    //         .catch(() => {return})
    // }

    const likeReview = (target: Review) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false

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

    const unlikeReview = (target: Review) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false

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
        if (!review) return false
        if (!currentUser.done_id.includes(review.product.id)) {
            dispatch(setPopper('undone'))
            return false
        }
        dispatch(asyncGetSpoiledContents(review.id)).then(
            result => setReview(result)
        ).catch(() => {return})
    }

    const getReview = () => {
        dispatch(asyncGetReview(id)).then(
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
                <Template
                    review={review}
                    formOpen={formOpen}
                    setFormOpen={setFormOpen}
                    reviewContents={reviewContents}
                    setReviewContents={setReviewContents}
                    editReview={editReview}
                    updateReview={updateReview}
                    deleteReview={deleteReview}
                    follow={follow}
                    unfollow={unfollow}
                    likeReview={likeReview}
                    unlikeReview={unlikeReview}
                    getSpoiledContents={getSpoiledContents}
                />
            )}
            {!review && <CircularLoader />}
        </>
    )
}
