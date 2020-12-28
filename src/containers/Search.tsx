import React, { FC, useEffect, useState } from 'react'

import { useAppDispatch } from '../stores/index'
import { ProductIndex } from '../@types'
import { asyncGetProducts } from '../ajax/product'
import { Search as SearchTemp } from '../components/templates/Search'
import { CircularLoader } from '../Loader/CircularLoader'

export const Search: FC = () => {
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
            {products && <SearchTemp products={products} />}
            {!products && <CircularLoader />}
        </>
    )
}
