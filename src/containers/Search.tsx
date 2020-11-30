import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { ProductDetail } from '../@types'
import { asyncGetProducts } from '../ajax/product'
import { Search as SearchTemp } from '../components/templates/Search'

export const Search: FC = () => {
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
            {products && <SearchTemp products={products} />}
            {!products && <div>loading</div>}
        </>
    )
}
