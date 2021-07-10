import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core'

import { User } from '../@types'

interface Props {
    user: User
    transition?: boolean
    className: ClassProps
}

interface ClassProps {
    width: string
    height: string
    margin?: string
}

const useStyles = makeStyles(theme =>
    createStyles({
        tran: (className: ClassProps) => ({
            height: className.height,
            width: className.width,
            margin: className.margin || '0',
            borderRadius: '50%',
            objectFit: 'cover',
            verticalAlign: 'top',
            '&:hover': {
                cursor: 'pointer'
            },
        }),
        notTran: (className: ClassProps) => ({
            height: className.height,
            width: className.width,
            margin: className.margin || '0',
            borderRadius: '50%',
            objectFit: 'cover',
            verticalAlign: 'top',
        }),
    })
)

export const UserImage: FC<Props> = props => {
    const classes = useStyles(props.className)
    const history = useHistory()

    const transition = () => {
        if (props.transition || props.transition === undefined) {
            history.push(`/users/${props.user.account_id}`)
        }
    }

    return (
        <img
            src={`${process.env.IMAGES_BASEURL}${props.user.image_name}`}
            onClick={transition}
            className={props.transition || props.transition === undefined ? classes.tran : classes.notTran}
        />
    )
}