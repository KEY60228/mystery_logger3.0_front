import React, { FC, Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { RootState } from '../stores/index'
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../util'

export const ErrorHandler: FC = () => {
    const history = useHistory()
    const code = useSelector((state: RootState) => state.error.code)

    useEffect(() => {
        if (code === INTERNAL_SERVER_ERROR) {
            history.push('/500')
        }
        if (code === NOT_FOUND) {
            history.push('/404')
        }
    }, [code])

    return <Fragment />
}
