import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import { PropsForTopPage } from '../../@types'
import { useAppDispatch } from '../../stores/index'
import { asyncGetProducts } from '../../ajax/product'

import { TopPageTemplate as Template } from './layout'
import { CircularLoader } from '../../handlers/Loader/CircularLoader'

export const TopPage: FC = () => {
    const dispatch = useAppDispatch()

    const [products, setProducts] = useState<PropsForTopPage | null>(null)
    const [keywords, setKeywords] = useState<string>('')

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
            {products &&
                <Template
                    products={products}
                    keywords={keywords}
                    setKeywords={setKeywords}
                />
            }
            {!products && <CircularLoader />}
        </>
    )
}
