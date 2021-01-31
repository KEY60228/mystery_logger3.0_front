import React, { FC, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { ProductIndex } from '../../@types'
import { useAppDispatch } from '../../stores/index'
import { asyncGetProducts } from '../../ajax/product'

import { SearchTemplate as Template } from './template'
import { CircularLoader } from '../../reusable/Loader/CircularLoader'

export const Search: FC = () => {
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
                <title>作品検索</title>
            </Helmet>
            {products && <Template products={products} />}
            {!products && <CircularLoader />}
        </>
    )
}
