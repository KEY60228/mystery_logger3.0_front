import React, { FC, useState, useEffect } from 'react'

import { useAppDispatch } from '../stores/index'
import { ProductIndex } from '../@types'
import { asyncGetProducts } from '../ajax/product'
import { TopPage as TPTemp } from '../components/templates/TopPage'
import { CircularLoader } from '../Loader/CircularLoader'

export const TopPage: FC = () => {
    const dispatch = useAppDispatch()

    const [products, setProducts] = useState<ProductIndex[] | null>(null)

    const getProducts = () => {
        dispatch(asyncGetProducts(setProducts))
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            {products && <TPTemp products={products} />}
            {!products && <CircularLoader />}
        </>
    )
}
