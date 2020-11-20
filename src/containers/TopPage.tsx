import React, { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ProductDetail } from '../@types'
import { asyncGetProducts } from '../ajax/product'
import { TopPage as TPTemp } from '../components/templates/TopPage'

export const TopPage: FC = () => {
    const dispatch = useDispatch()

    const [products, setProducts] = useState<ProductDetail[] | null>(null)

    const getProducts = () => {
        dispatch(asyncGetProducts(setProducts))
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            {products && <TPTemp products={products} />}
            {!products && <div>loading</div>}
        </>
    )
}
