import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Product, ReviewDetail, User } from '../@types'
import { RootState } from '../stores/index'
import { setFocusedProduct, setWannaStatus } from '../stores/product'
import { setFocusedReview, setPostStatus } from '../stores/review'
import { asyncGetProduct, asyncUnwanna, asyncWanna } from '../ajax/product'
import { asyncDeleteReview, asyncPostReview, asyncUpdateReview } from '../ajax/review'
import { asyncFollow, asyncUnFollow } from '../ajax/user'
import { asyncGetCurrentUser } from '../ajax/auth'
import { ProductDetail as ProductDetailTemp } from '../components/templates/ProductDetail'
import { ReviewForm } from '../components/templates/ReviewForm'
import { setFollowStatus } from '../stores/user'

export const ProductDetail: FC = () => {
    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>()

    const postStatus = useSelector(
        (state: RootState) => state.review.postStatus,
    )
    const product = useSelector(
        (state: RootState) => state.product.focusedProduct,
    )
    const review = useSelector((state: RootState) => state.review.focusedReview)
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const followStatus = useSelector((state: RootState) => state.user.followStatus)
    const wannaStatus = useSelector((state: RootState) => state.product.wannaStatus)

    const [rating, setRating] = useState<number>(0)
    const [result, setResult] = useState<number>(0)
    const [joined_at, setJoined_at] = useState<string | null>('')
    const [contents, setContents] = useState<string | null>('')

    // 投稿フォームの開閉
    const [open, setOpen] = useState<boolean>(false)
    const setModalOpen = (value: boolean) => {
        if (!value) dispatch(setFocusedReview(null))
        setOpen(value)
    }
    // 新規投稿 or 編集
    const [isNew, setIsNew] = useState<boolean>(false)

    const getProduct = () => {
        dispatch(asyncGetProduct(id))
    }

    const post = () => {
        if (!currentUser || !product) return false
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

    const setReview = (review: ReviewDetail) => {
        dispatch(setFocusedReview(review))
    }

    const edit = (review: ReviewDetail) => {
        dispatch(setFocusedReview(review))
        setRating(review.rating)
        setResult(review.result)
        setJoined_at(review.joined_at)
        setContents(review.contents)
        setModalOpen(true)
    }

    const update = () => {
        if (!currentUser || !product || !review) return false
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
        if (!review) return false
        dispatch(asyncDeleteReview(review.id))
    }

    const follow = (user: User) => {
        if (!currentUser || !user) return false
        dispatch(asyncFollow(currentUser.id, user.id))
    }
    
    const unfollow = (user: User) => {
        if(!currentUser || !user) return false
        dispatch(asyncUnFollow(currentUser.id, user.id))
    }

    const wanna = (product: Product) => {
        if (!currentUser || !product) return false
        dispatch(asyncWanna(currentUser.id, product.id))
    }

    const unwanna = (product: Product) => {
        if (!currentUser || !product) return false
        dispatch(asyncUnwanna(currentUser.id, product.id))
    }

    useEffect(() => {
        getProduct()

        return () => {
            dispatch(setFocusedReview(null))
            dispatch(setFocusedProduct(null))
        }
    }, [])

    useEffect(() => {
        if (postStatus) {
            getProduct()
            dispatch(asyncGetCurrentUser())
            setModalOpen(false)
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
            dispatch(setFollowStatus(null))
        }
    }, [followStatus])

    useEffect(() => {
        if (wannaStatus) {
            dispatch(asyncGetCurrentUser())
            dispatch(setWannaStatus(null))
        }
    }, [wannaStatus])

    return (
        <>
            {product && (
                <>
                    <ProductDetailTemp
                        product={product}
                        currentUser={currentUser}
                        review={review}
                        setOpen={setModalOpen}
                        setIsNew={setIsNew}
                        setReview={setReview}
                        edit={edit}
                        deleteReview={deleteReview}
                        follow={follow}
                        unfollow={unfollow}
                        wanna={wanna}
                        unwanna={unwanna}
                    />
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
                        post={post}
                        update={update}
                        isNew={isNew}
                        product={product}
                    />
                </>
            )}
            {!product && <div>loading</div>}
        </>
    )
}
