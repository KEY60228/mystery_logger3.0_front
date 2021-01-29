import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
    Product,
    ProductDetail as ProductDetailInterface,
    ReviewDetail,
    User,
} from '../@types'
import { asyncGetProduct, asyncUnwanna, asyncWanna } from '../ajax/product'
import {
    asyncDeleteReview,
    asyncLikeReview,
    asyncPostComment,
    asyncPostReview,
    asyncUnlikeReview,
    asyncUpdateReview,
} from '../ajax/review'
import { asyncFollow, asyncUnFollow } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { RootState, useAppDispatch } from '../stores/index'
import { setPopper } from '../stores/error'
import { setUser } from '../stores/auth'

import { ProductDetail as ProductDetailTemp } from '../components/templates/ProductDetail'
import { CircularLoader } from '../reusable/Loader/CircularLoader'

export const ProductDetail: FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [product, setProduct] = useState<ProductDetailInterface | null>(null)

    const [spoil, setSpoil] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<Date | null>(null)
    const [contents, setContents] = useState<string | null>('')
    const [comment, setComment] = useState<string | null>('')

    // 投稿フォームの開閉
    const [open, setOpen] = useState<boolean>(false)

    // 新規投稿 or 編集
    const [isNew, setIsNew] = useState<boolean>(false)

    const getProduct = () => {
        dispatch(asyncGetProduct(id)).then(result => setProduct(result)).catch(() => {return})
    }

    const post = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!product) return false // 仮
        const joined = joined_at?.toISOString() || null
        dispatch(
            asyncPostReview(
                product.id,
                spoil,
                rating,
                result,
                joined,
                contents,
            ),
        )
            .then(() => {
                getProduct()
                dispatch(asyncGetCurrentUser())
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at(null)
                setContents('')
                setIsNew(false)
            })
            .catch(() => {return})
    }

    const edit = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        const review = product?.reviews?.find(
            (review: ReviewDetail) => review.user_id === currentUser.id,
        )
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
        const review = product?.reviews?.find(
            (review: ReviewDetail) => review.user_id === currentUser.id,
        )
        if (!product || !review) return false // 仮
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
            .then(() => {
                getProduct()
                dispatch(asyncGetCurrentUser())
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at(null)
                setContents('')
                setIsNew(false)
            })
            .catch(() => {return})
    }

    const deleteReview = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        const review = product?.reviews?.find((review: ReviewDetail) =>
            currentUser.done_id.includes(review.product_id),
        )
        if (!review) return false // 仮
        dispatch(asyncDeleteReview(review.id))
            .then(() => {
                getProduct()
                dispatch(asyncGetCurrentUser())
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at(null)
                setContents('')
                setIsNew(false)
            })
            .catch(() => {return})
    }

    const follow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!user) return false // 仮

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
        if (!user) return false // 仮

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

    const wanna = (prod: Product) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!prod) return false // 仮

        // 楽観的更新
        dispatch(
            setUser(
                Object.assign({}, currentUser, {
                    wanna_id: currentUser.wanna_id.concat([prod.id]),
                }),
            ),
        )
        setProduct(
            Object.assign({}, product, {
                wannas_count: product!.wannas_count + 1,
            }),
        )

        dispatch(asyncWanna(prod.id))
            .then(() => {
                getProduct()
                dispatch(asyncGetCurrentUser())
            })
            .catch(() => {return})
    }

    const unwanna = (prod: Product) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!prod) return false // 仮

        // 楽観的更新
        const wanna_id = currentUser.wanna_id.filter(el => {
            return el !== prod.id
        })
        dispatch(
            setUser(Object.assign({}, currentUser, { wanna_id: wanna_id })),
        )
        setProduct(
            Object.assign({}, product, {
                wannas_count: product!.wannas_count - 1,
            }),
        )

        dispatch(asyncUnwanna(prod.id))
            .then(() => {
                getProduct()
                dispatch(asyncGetCurrentUser())
            })
            .catch(() => {return})
    }

    const postComment = (review: ReviewDetail) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review || !comment) return false // 仮
        dispatch(asyncPostComment(review.id, comment))
            .then(() => getProduct())
            .catch(() => {return})
    }

    const likeReview = (review: ReviewDetail) => {
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

    const unlikeReview = (review: ReviewDetail) => {
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

    useEffect(() => {
        getProduct()

        return () => {
            setProduct(null)
        }
    }, [])

    return (
        <>
            <Helmet>
                <title>作品情報 - なぞログ</title>
            </Helmet>
            {product && (
                <>
                    <ProductDetailTemp
                        currentUser={currentUser}
                        product={product}
                        isNew={isNew}
                        setIsNew={setIsNew}
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
                        post={post}
                        update={update}
                        deleteReview={deleteReview}
                        follow={follow}
                        unfollow={unfollow}
                        wanna={wanna}
                        unwanna={unwanna}
                        comment={comment}
                        setComment={setComment}
                        postComment={postComment}
                        likeReview={likeReview}
                        unlikeReview={unlikeReview}
                    />
                </>
            )}
            {!product && <CircularLoader />}
        </>
    )
}
