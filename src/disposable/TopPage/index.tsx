import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import { ProductIndex } from '../../@types'
import { useAppDispatch } from '../../stores/index'
import { asyncGetProducts } from '../../ajax/product'

import { TopPageTemplate as Template } from './template'
import { CircularLoader } from '../../reusable/Loader/CircularLoader'

export const TopPage: FC = () => {
    const dispatch = useAppDispatch()

    const [products, setProducts] = useState<ProductIndex[] | null>(null)

    const getProducts = () => {
        dispatch(asyncGetProducts()).then(
            result => setProducts(result)
        ).catch(() => {return})
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <Helmet>
                <title>なぞログ</title>
            </Helmet>
            {products && <Template products={products} />}
            {!products && <CircularLoader />}
        </>
    )
}
