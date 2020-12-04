import React, { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AccompanyDetail } from '../@types'
import { asyncGetAccompanies } from '../ajax/accompany'
import { Accompanies as AccompaniesTemp } from '../components/templates/Accompanies'

export const Accompanies: FC = () => {
    const dispatch = useDispatch()
    const [accompanies, setAccompanies] = useState<AccompanyDetail[] | null>(null)

    const getAccompanies = () => {
        dispatch(asyncGetAccompanies(setAccompanies))
    }

    useEffect(() => {
        getAccompanies()
    }, [])

    return (
        <>
            { accompanies &&
                <AccompaniesTemp accompanies={accompanies} />
            }
            { !accompanies &&
                <div>loading</div>
            }
        </>
    )
}
