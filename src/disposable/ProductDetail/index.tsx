import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ProductDetail as ProductDetailInterface, ReviewContents, Review, User } from '../../@types'
import { useAppDispatch, RootState } from '../../stores/index'
import { asyncGetProduct, asyncUnwanna, asyncWanna } from '../../ajax/product'
import { ProductDetailTemplate as Template } from './layout'
import { CircularLoader } from '../../_reusable/Loader/CircularLoader'
import { asyncDeleteReview, asyncLikeReview, asyncPostReview, asyncUnlikeReview, asyncUpdateReview } from '../../ajax/review'
import { asyncGetCurrentUser } from '../../ajax/auth'
import { setPopper } from '../../stores/error'
import { setUser } from '../../stores/auth'
import { asyncFollow, asyncUnFollow } from '../../ajax/user'

export const ProductDetail: FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()

    // ログインユーザー
    const currentUser = useSelector((state: RootState) => state.auth.user)

    // Product state
    const [product, setProduct] = useState<ProductDetailInterface | null>(null)

    // 投稿フォームの開閉
    const [formOpen, setFormOpen] = useState<boolean>(false)

    // レビューのstate
    const [reviewContents, setReviewContents] = useState<ReviewContents>({
        spoil: false,
        rating: 0,
        result: 0,
        joined_at: null,
        contents: '',
    })

    const editReview = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        const review = product?.reviews?.find(
            review => review.user_id === currentUser.id,
        )
        if (!review) {
            setFormOpen(true)
        } else {
            setReviewContents({
                rating: review.rating,
                result: review.result,
                joined_at: review.joined_at ? new Date(review.joined_at) : null,
                contents: review.exposed_contents,
                spoil: review.spoil,
            })
            setFormOpen(true)
        }
    }

    const postReview = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!product) return false
        const review = product?.reviews?.find(
            review => review.user_id === currentUser.id
        )
        if (!review) {
            dispatch(
                asyncPostReview(
                    product.id,
                    reviewContents.spoil,
                    reviewContents.rating,
                    reviewContents.result,
                    reviewContents.joined_at?.toISOString() || null,
                    reviewContents.contents,
                ),
            )
            .then(() => {
                getProduct()
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
        } else {
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
                getProduct()
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
    }

    const deleteReview = (review: Review) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        dispatch(asyncDeleteReview(review.id))
            .then(() => {
                getProduct()
                dispatch(asyncGetCurrentUser())
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

    const follow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }

        // 楽観的更新
        dispatch(
            setUser(
                // 修正余地あり？
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
            // 修正余地あり？
            setUser(Object.assign({}, currentUser, { follows_id: follows_id })),
        )

        dispatch(asyncUnFollow(user.id))
            .then(() => dispatch(asyncGetCurrentUser()))
            .catch(() => {return})
    }

    const wanna = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!product) return false

        // 楽観的更新
        dispatch(
            setUser(
                Object.assign({}, currentUser, {
                    wanna_id: currentUser.wanna_id.concat([product.id]),
                }),
            ),
        )
        setProduct(
            Object.assign({}, product, {
                wannas_count: product.wannas_count + 1,
            }),
        )

        dispatch(asyncWanna(product.id))
            .then(() => {
                getProduct()
                dispatch(asyncGetCurrentUser())
            })
            .catch(() => {return})
    }

    const unwanna = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!product) return false

        // 楽観的更新
        const wanna_id = currentUser.wanna_id.filter(el => {
            return el !== product.id
        })
        dispatch(
            setUser(Object.assign({}, currentUser, { wanna_id: wanna_id })),
        )
        setProduct(
            Object.assign({}, product, {
                wannas_count: product.wannas_count - 1,
            }),
        )

        dispatch(asyncUnwanna(product.id))
            .then(() => {
                getProduct()
                dispatch(asyncGetCurrentUser())
            })
            .catch(() => {return})
    }

    const likeReview = (review: Review) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }

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
        const reviews = product?.reviews.map(el => {
            if (el.id === review.id) {
                const num = el.review_likes_count
                return Object.assign({}, el, { review_likes_count: num + 1 })
            }
            return el
        })
        setProduct(Object.assign({}, product, { reviews: reviews }))

        dispatch(asyncLikeReview(review.id))
            .then(() => {
                dispatch(asyncGetCurrentUser())
                getProduct()
            })
            .catch(() => {return})
    }

    const unlikeReview = (review: Review) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }

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
        const reviews = product?.reviews.map(el => {
            if (el.id === review.id) {
                const num = el.review_likes_count
                return Object.assign({}, el, { review_likes_count: num - 1 })
            }
            return el
        })
        setProduct(Object.assign({}, product, { reviews: reviews }))

        dispatch(asyncUnlikeReview(review.id))
            .then(() => {
                dispatch(asyncGetCurrentUser())
                getProduct()
            })
            .catch(() => {return})
    }

    const getProduct = () => {
        dispatch(asyncGetProduct(id)).then(result => setProduct(result)).catch(() => {return})
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <Helmet>
                <title>作品情報 - なぞログ</title>
            </Helmet>
            {product && (
                <Template
                    product={product}
                    formOpen={formOpen}
                    setFormOpen={setFormOpen}
                    reviewContents={reviewContents}
                    setReviewContents={setReviewContents}
                    editReview={editReview}
                    postReview={postReview}
                    deleteReview={deleteReview}
                    follow={follow}
                    unfollow={unfollow}
                    wanna={wanna}
                    unwanna={unwanna}
                    likeReview={likeReview}
                    unlikeReview={unlikeReview}
                />
            )}
            {!product && <CircularLoader />}
        </>
    )
}