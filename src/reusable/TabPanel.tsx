import React, { FC } from 'react'
import { Box } from '@material-ui/core'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

export const TabPanel: FC<TabPanelProps> = (props) => {
    return (
        <div hidden={props.value !== props.index}>
            {props.value === props.index && <Box>{props.children}</Box>}
        </div>
    )
}