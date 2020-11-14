import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { UserDetail } from '../../@types'
import { UserForm as UserFormMod } from '../organisms/UserForm/index'

interface Props {
    user: UserDetail
    update: () => void
    open: boolean
    setOpen: (value: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    })
)

export const UserForm: FC<Props> = ({
    user, update, open, setOpen
}) => {
    const classes = useStyles()

    return (
        <UserFormMod user={user} update={update} open={open} setOpen={setOpen} />
    )
}
