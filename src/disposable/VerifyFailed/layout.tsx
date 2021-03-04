import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyes = makeStyles(() =>
    createStyles({
        root: {

        }
    })
)

export const VerifyFailedTemplate: FC = () => {
    return (
        <Box>
            <p>認証に失敗しました</p>
        </Box>
    )
}
