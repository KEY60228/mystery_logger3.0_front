import React, { FC, Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { RootState, useAppDispatch } from '../stores/index'
import { setPopper } from '../stores/error'
import { setUser } from '../stores/auth'
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHENTICATED } from '../util'

export const ErrorHandler: FC = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const code = useSelector((state: RootState) => state.error.code)

    useEffect(() => {
        if (code === INTERNAL_SERVER_ERROR) {
            history.push('/500')
        }
        if (code === NOT_FOUND) {
            history.push('/404')
        }
        if (code === UNAUTHENTICATED) {
            dispatch(setUser(null))
            dispatch(setPopper('session out'))
            history.push('/login')
        }
    }, [code])

    return <Fragment />
}
