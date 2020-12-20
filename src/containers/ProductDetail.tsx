import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Product, ReviewDetail, User } from '../@types'
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
import { setFocusedProduct } from '../stores/product'
import { setPopper } from '../stores/error'
import { ProductDetail as ProductDetailTemp } from '../components/templates/ProductDetail'

export const ProductDetail: FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()

    const product = useSelector(
        (state: RootState) => state.product.focusedProduct,
    )
    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [spoil, setSpoil] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>('')
    const [contents, setContents] = useState<string | null>('')
    const [comment, setComment] = useState<string | null>('')

    // 投稿フォームの開閉
    const [open, setOpen] = useState<boolean>(false)

    // 新規投稿 or 編集
    const [isNew, setIsNew] = useState<boolean>(false)

    const getProduct = () => {
        dispatch(asyncGetProduct(id))
    }

    const post = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!product) return false // 仮
        dispatch(
            asyncPostReview(
                product.id,
                spoil,
                rating,
                result,
                joined_at,
                contents,
            ),
        ).then(
            () => {
                getProduct()
                dispatch(asyncGetCurrentUser())
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at('')
                setContents('')
                setIsNew(false)
            }
        ).catch(

        )
    }

    const edit = () => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        const review = product?.reviews?.find((review: ReviewDetail) =>
            review.user_id === currentUser.id
        )
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
        const review = product?.reviews?.find((review: ReviewDetail) =>
            review.user_id === currentUser.id
        )
        if (!product || !review) return false // 仮
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
            () => {
                getProduct()
                dispatch(asyncGetCurrentUser())
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at('')
                setContents('')
                setIsNew(false)
            }
        ).catch(

        )
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
        dispatch(asyncDeleteReview(review.id)).then(
            () => {
                getProduct()
                dispatch(asyncGetCurrentUser())
                setOpen(false)
                setRating(0)
                setResult(0)
                setJoined_at('')
                setContents('')
                setIsNew(false)
            }
        ).catch()
    }

    const follow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!user) return false // 仮
        dispatch(asyncFollow(user.id)).then(
            () => dispatch(asyncGetCurrentUser())
        ).catch(

        )
    }

    const unfollow = (user: User) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!user) return false // 仮
        dispatch(asyncUnFollow(user.id)).then(
            () => dispatch(asyncGetCurrentUser())
        ).catch(

        )
    }

    const wanna = (product: Product) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!product) return false // 仮
        dispatch(asyncWanna(product.id)).then(
            () => {
                getProduct()
                dispatch(asyncGetCurrentUser())
            }
        ).catch(

        )
    }

    const unwanna = (product: Product) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!product) return false // 仮
        dispatch(asyncUnwanna(product.id)).then(
            () => {
                getProduct()
                dispatch(asyncGetCurrentUser())
            }
        ).catch(

        )
    }

    const postComment = (review: ReviewDetail) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review || !comment) return false // 仮
        dispatch(asyncPostComment(review.id, comment)).then(
            () => getProduct()
        ).catch(

        )
    }

    const likeReview = (review: ReviewDetail) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮
        dispatch(asyncLikeReview(review.id)).then(
            () => {
                dispatch(asyncGetCurrentUser())
                getProduct()
            }
        ).catch(

        )
    }

    const unlikeReview = (review: ReviewDetail) => {
        if (!currentUser) {
            dispatch(setPopper('unauthenticated'))
            return false
        }
        if (!review) return false // 仮
        dispatch(asyncUnlikeReview(review.id)).then(
            () => {
                dispatch(asyncGetCurrentUser())
                getProduct()
            }
        ).catch(

        )
    }

    useEffect(() => {
        getProduct()

        return () => {
            dispatch(setFocusedProduct(null))
        }
    }, [])

    return (
        <>
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
            {!product && <div>loading</div>}
        </>
    )
}
