import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ProductDetail as ProductDetailInterface, ReviewContents, Review } from '../../@types'
import { useAppDispatch, RootState } from '../../stores/index'
import { asyncGetProduct } from '../../ajax/product'
import { ProductDetailTemplate as Template } from './layout'
import { CircularLoader } from '../../_reusable/Loader/CircularLoader'
import { asyncDeleteReview, asyncPostReview, asyncUpdateReview } from '../../ajax/review'
import { asyncGetCurrentUser } from '../../ajax/auth'
import { setPopper } from '../../stores/error'

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



    // const [comment, setComment] = useState<string | null>('')



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
                />
            )}
            {!product && <CircularLoader />}
        </>
    )
}