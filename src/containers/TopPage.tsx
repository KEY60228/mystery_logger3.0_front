import React, { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Product } from '../@types'
import { TopPage as TPTemp } from '../components/templates/TopPage'
import { asyncGetProducts } from '../ajax/product'
import { setFocusedProduct } from '../stores/product'
import { setFocusedReview } from '../stores/review'

export const TopPage: FC = () => {
    const dispatch = useDispatch()

    const [products, setProducts] = useState<Product[] | null>(null)

    const getProducts = () => {
        dispatch(asyncGetProducts(setProducts))
    }

    useEffect(() => {
        getProducts()

        return () => {
            dispatch(setFocusedProduct(null))
            dispatch(setFocusedReview(null))
        }
    }, [])

    return (
        <>
            {products && <TPTemp products={products} />}
            {!products && <div>loading</div>}
        </>
    )
}
