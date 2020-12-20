import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../stores'
import { LoginPop } from './LoginPop'
import { LogoutPop } from './LogoutPop'
import { UnauthPop } from './UnauthPop'

export const PopHandler: FC = () => {
    const popper = useSelector((state: RootState) => state.error.popper)

    const [loginOpen, setLoginOpen] = useState<boolean>(false)
    const [logoutOpen, setLogoutOpen] = useState<boolean>(false)
    const [unauthOpen, setUnauthOpen] = useState<boolean>(false)
    const [loggedInOpen, setLoggedInOpen] = useState<boolean>(false)
    const [undoneOpen, setUndoneOpen] = useState<boolean>(false)
    const [badRequestOpen, setBadRequestOpen] = useState<boolean>(false)

    useEffect(() => {
        switch (popper) {
            case 'login':
                setLoginOpen(true)
                break
            case 'logout':
                setLogoutOpen(true)
                break
            case 'unauthenticated':
                setUnauthOpen(true)
                break
            case 'already logged in':
                setLoggedInOpen(true)
                break
            case 'undone':
                setUndoneOpen(true)
                break
            case 'bad request':
                setBadRequestOpen(true)
                break
            default:
                break
        }
    }, [popper])

    return (
        <>
            <LoginPop
                open={loginOpen}
                setOpen={setLoginOpen}
            />
            <LogoutPop
                open={logoutOpen}
                setOpen={setLogoutOpen}
            />
            <UnauthPop
                open={unauthOpen}
                setOpen={setUnauthOpen}
            />
        </>
    )
}