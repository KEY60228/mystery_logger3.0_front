import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Product, ReviewDetail, User } from '../@types'
import { asyncGetProduct, asyncUnwanna, asyncWanna } from '../ajax/product'
import { asyncDeleteReview, asyncLikeReview, asyncPostComment, asyncPostReview, asyncUpdateReview } from '../ajax/review'
import { asyncFollow, asyncUnFollow } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { RootState } from '../stores/index'
import { setFocusedProduct } from '../stores/product'
import { setPostStatus } from '../stores/review'
import { ProductDetail as ProductDetailTemp } from '../components/templates/ProductDetail'

export const ProductDetail: FC = () => {
    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>()

    const product = useSelector((state: RootState) => state.product.focusedProduct)
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const postStatus = useSelector((state: RootState) => state.review.postStatus)
    const followStatus = useSelector((state: RootState) => state.user.followStatus)
    const wannaStatus = useSelector((state: RootState) => state.product.wannaStatus)
    const commentStatus = useSelector((state: RootState) => state.review.commentStatus)
    const likeStatus = useSelector((state: RootState) => state.review.likeStatus)

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
        if (!currentUser || !product) return false // 仮
        dispatch(
            asyncPostReview(
                rating,
                result,
                joined_at,
                contents,
                currentUser.id,
                product.id,
            ),
        )
    }

    const edit = () => {
        const review = product?.reviews?.find((review: ReviewDetail) => currentUser?.done_id.includes(review.product_id))
        if (!review) return false // 仮
        setRating(review.rating)
        setResult(review.result)
        setJoined_at(review.joined_at)
        setContents(review.contents)
        setOpen(true)
    }

    const update = () => {
        const review = product?.reviews?.find((review: ReviewDetail) => currentUser?.done_id.includes(review.product_id))
        if (!currentUser || !product || !review) return false // 仮
        dispatch(
            asyncUpdateReview(
                rating,
                result,
                joined_at,
                contents,
                currentUser.id,
                product.id,
                review.id,
            ),
        )
    }

    const deleteReview = () => {
        const review = product?.reviews?.find((review: ReviewDetail) => currentUser?.done_id.includes(review.product_id))
        if (!review) return false // 仮
        dispatch(asyncDeleteReview(review.id))
    }

    const follow = (user: User) => {
        if (!currentUser || !user) return false // 仮
        dispatch(asyncFollow(currentUser.id, user.id))
    }
    
    const unfollow = (user: User) => {
        if(!currentUser || !user) return false // 仮
        dispatch(asyncUnFollow(currentUser.id, user.id))
    }

    const wanna = (product: Product) => {
        if (!currentUser || !product) return false // 仮
        dispatch(asyncWanna(currentUser.id, product.id))
    }

    const unwanna = (product: Product) => {
        if (!currentUser || !product) return false // 仮
        dispatch(asyncUnwanna(currentUser.id, product.id))
    }

    const postComment = (review: ReviewDetail) => {
        if (!currentUser || !review || !comment) return false
        dispatch(asyncPostComment(currentUser.id, review.id, comment))
    }

    const likeReview = (review: ReviewDetail) => {
        if (!currentUser || !review) return false
        dispatch(asyncLikeReview(currentUser.id, review.id))
    }

    useEffect(() => {
        getProduct()

        return () => {
            dispatch(setFocusedProduct(null))
        }
    }, [])

    useEffect(() => {
        if (postStatus) {
            getProduct()
            dispatch(asyncGetCurrentUser())
            setOpen(false)
            setRating(0)
            setResult(0)
            setJoined_at('')
            setContents('')
            setIsNew(false)
            dispatch(setPostStatus(null))
        }
    }, [postStatus])

    useEffect(() => {
        if (followStatus) {
            dispatch(asyncGetCurrentUser())
        }
    }, [followStatus])

    useEffect(() => {
        if (wannaStatus) {
            getProduct()
            dispatch(asyncGetCurrentUser())
        }
    }, [wannaStatus])

    useEffect(() => {
        if (commentStatus) {
            getProduct()
        }
    }, [commentStatus])

    useEffect(() => {
        if (likeStatus) {
            dispatch(asyncGetCurrentUser())
            getProduct()
        }
    }, [likeStatus])

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
                    />
                </>
            )}
            {!product && <div>loading</div>}
        </>
    )
}
