import React, { FC, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import { AccompanyIndex } from '../@types'
import { useAppDispatch } from '../stores/index'
import { asyncGetAccompanies } from '../ajax/accompany'

import { Accompanies as AccompaniesTemp } from './templates/Accompanies'
import { CircularLoader } from '../reusable/Loader/CircularLoader'

export const Accompanies: FC = () => {
    const dispatch = useAppDispatch()
    const [accompanies, setAccompanies] = useState<AccompanyIndex[] | null>(
        null,
    )

    const getAccompanies = () => {
        dispatch(asyncGetAccompanies()).then(
            (result: AccompanyIndex[]) => setAccompanies(result)
        ).then(
            () => {return}
        )
    }

    useEffect(() => {
        getAccompanies()
    }, [])

    return (
        <>
            <Helmet>
                <title>同行者募集一覧 - なぞログ</title>
            </Helmet>
            {accompanies && <AccompaniesTemp accompanies={accompanies} />}
            {!accompanies && <CircularLoader />}
        </>
    )
}
