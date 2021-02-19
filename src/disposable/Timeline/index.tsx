import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

import { ReviewIndex, Review, User, ReviewContents, ReviewDetail } from '../../@types'
import {
    asyncDeleteReview,
    asyncGetTimeline,
    asyncLikeReview,
    asyncPostComment,
    asyncUnlikeReview,
    asyncUpdateReview,
} from '../../ajax/review'
import { asyncFollow, asyncUnFollow } from '../../ajax/user'
import { asyncGetCurrentUser } from '../../ajax/auth'
import { RootState, useAppDispatch } from '../../stores/index'
import { setPopper } from '../../stores/error'
import { setUser } from '../../stores/auth'

import { CircularLoader } from '../../_reusable/Loader/CircularLoader'
import { TimelineTemplate as Template } from './layout'

export const Timeline: FC = () => {
    const dispatch = useAppDispatch()

    // ログインユーザー
    const currentUser = useSelector((state: RootState) => state.auth.user)

    // reviews state
    const [reviews, setReviews] = useState<ReviewIndex[] | null>(null)
    // 編集対象review state
    const [review, setReview] = useState<ReviewDetail | null>(null)

    const [reviewContents, setReviewContents] = useState<ReviewContents>({
        spoil: false,
        rating: 0,
        result: 0,
        joined_at: null,
        contents: '',
    })

    // const [comment, setComment] = useState<string | null>('')

    // 投稿フォームの開閉
    const [formOpen, setFormOpen] = useState<boolean>(false)

    const edit = (review: ReviewDetail) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false
        setReview(review)
        setReviewContents({
            rating: review.rating,
            result: review.result,
            joined_at: review.joined_at ? new Date(review.joined_at) : null,
            spoil: review.spoil,
            contents: review.exposed_contents,
        })
        setFormOpen(true)
    }

    const update = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false
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
                getReviews()
                setFormOpen(false)
                setReviewContents({
                    rating: 0,
                    result: 0,
                    spoil: false,
                    joined_at: null,
                    contents: '',
                })
            })
            .catch(() => {return})
    }

    const deleteReview = (review: Review) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false
        dispatch(asyncDeleteReview(review.id))
            .then(() => {
                getReviews()
                setFormOpen(false)
            })
            .catch(() => {return})
    }

    const follow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!user) return false

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
        if (!user) return false

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

    // const postComment = (review: ReviewIndex) => {
    //     if (!currentUser) {
    //         dispatch(setPopper('unauthenticated'))
    //         return false
    //     }
    //     if (!review || !comment) return false // 仮
    //     dispatch(asyncPostComment(review.id, comment))
    //         .then(() => getReviews())
    //         .catch(() => {return})
    // }

    // const likeReview = (review: ReviewIndex) => {
    //     if (!currentUser) {
    //         dispatch(setPopper('unauthenticated'))
    //         return false
    //     }
    //     if (!review || !reviews) return false // 仮

    //     // 楽観的更新 (currentUser.like_reviews_idにプラス&該当のreview.review_likes_countに+1)
    //     dispatch(
    //         setUser(
    //             Object.assign({}, currentUser, {
    //                 like_reviews_id: currentUser.like_reviews_id.concat([
    //                     review.id,
    //                 ]),
    //             }),
    //         ),
    //     )
    //     const tmp = reviews.map(el => {
    //         if (el.id === review.id) {
    //             const num = el.review_likes_count
    //             return Object.assign({}, el, { review_likes_count: num + 1 })
    //         }
    //         return el
    //     })
    //     setReviews(tmp)

    //     dispatch(asyncLikeReview(review.id))
    //         .then(() => {
    //             dispatch(asyncGetCurrentUser())
    //             getReviews()
    //         })
    //         .catch(() => {return})
    // }

    // const unlikeReview = (review: ReviewIndex) => {
    //     if (!currentUser) {
    //         dispatch(setPopper('unauthenticated'))
    //         return false
    //     }
    //     if (!review || !reviews) return false // 仮

    //     // 楽観的更新 (currentUser.like_reviews_idから削除&該当のreview.review_likes_countに-1)
    //     const like_reviews_id = currentUser.like_reviews_id.filter(el => {
    //         return el !== review.id
    //     })
    //     dispatch(
    //         setUser(
    //             Object.assign({}, currentUser, {
    //                 like_reviews_id: like_reviews_id,
    //             }),
    //         ),
    //     )
    //     const tmp = reviews.map(el => {
    //         if (el.id === review.id) {
    //             const num = el.review_likes_count
    //             return Object.assign({}, el, { review_likes_count: num - 1 })
    //         }
    //         return el
    //     })
    //     setReviews(tmp)

    //     dispatch(asyncUnlikeReview(review.id))
    //         .then(() => {
    //             dispatch(asyncGetCurrentUser())
    //             getReviews()
    //         })
    //         .catch(() => {return})
    // }



    const getReviews = async () => {
        dispatch(asyncGetTimeline()).then(
            result => setReviews(result)
        ).catch(() => {return})
    }

    useEffect(() => {
        getReviews()
    }, [])

    return (
        <>
            <Helmet>
                <title>タイムライン - なぞログ</title>
            </Helmet>
            {reviews && (
                <>
                    <Template
                        reviews={reviews}
                        review={review}
                        formOpen={formOpen}
                        setFormOpen={setFormOpen}
                        reviewContents={reviewContents}
                        setReviewContents={setReviewContents}
                        editReview={edit}
                        postReview={update}
                        deleteReview={deleteReview}
                        follow={follow }
                        unfollow={unfollow }
                    />
                </>
            )}
            {!reviews && <CircularLoader />}
        </>
    )
}
