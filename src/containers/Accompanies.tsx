import React, { FC, useState, useEffect } from 'react'

import { useAppDispatch } from '../stores/index'
import { AccompanyIndex } from '../@types'
import { asyncGetAccompanies } from '../ajax/accompany'
import { Accompanies as AccompaniesTemp } from '../components/templates/Accompanies'

export const Accompanies: FC = () => {
    const dispatch = useAppDispatch()
    const [accompanies, setAccompanies] = useState<AccompanyIndex[] | null>(null)

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
