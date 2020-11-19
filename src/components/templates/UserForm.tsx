import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { UserDetail } from '../../@types'
import { UserForm as UserFormMod } from '../organisms/UserDetail/UserForm/'

interface Props {
    user: UserDetail
    update: () => void
    open: boolean
    setOpen: (value: boolean) => void
    name: string
    setName: (value: string) => void
    accountId: string
    setAccountId: (value: string) => void
    profile: string
    setProfile: (value: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    })
)

export const UserForm: FC<Props> = ({
    user, update, open, setOpen, name, setName, accountId, setAccountId, profile, setProfile
}) => {
    const classes = useStyles()

    return (
        <UserFormMod
            user={user}
            update={update}
            open={open}
            setOpen={setOpen}
            name={name}
            setName={setName}
            accountId={accountId}
            setAccountId={setAccountId}
            profile={profile}
            setProfile={setProfile}
        />
    )
}
