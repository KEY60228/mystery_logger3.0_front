import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ProductDetail as ProductDetailInterface } from '../../@types'
import { useAppDispatch, RootState } from '../../stores/index'
import { asyncGetProduct } from '../../ajax/product'
import { ProductDetailTemplate as Template } from './layout'
import { CircularLoader } from '../../reusable/Loader/CircularLoader'

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

    useEffect(() => {
        getProduct()

        return () => {
            setProduct(null)
        }
    }, [])

    return (
        <>
            {product && (
                <Template
                    product={product}
                />
            )}
            {!product && <CircularLoader />}
        </>
    )
}