import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

interface Props {
    className?: ClassProps
}

interface ClassProps {
    height?: string
    margin?: string
    padding?: string
    fontSize?: string
}

const useStyles = makeStyles(() =>
    createStyles({
        search: (className: ClassProps) => ({
            margin: className.margin || '40px 0',
            padding: className.padding || '0 44px',
        }),
        searchBox: (className: ClassProps) => ({
            padding: '0',
            width: '100%',
            height: className.height || '24px',
            boxShadow: '1px 1px #0A0A0A',
        }),
        searchInput: (className: ClassProps) => ({
            padding: '0 0 0 8px',
            lineHeight: className.height || '24px',
            fontSize: className.fontSize || '12px',
        }),
        searchIcon: (className: ClassProps) => ({
            width: className.height || '24px',
            height: className.height || '24px',
        }),
        searchIconButton: {
            padding: '0px',
        },
    })
)

export const SearchBox: FC<Props> = props => {
    const classes = useStyles(props.className)

    return (
        <Box className={classes.search}>
            <OutlinedInput
                placeholder="作品名、会場名、キーワードで検索"
                color="primary"
                endAdornment={(
                    <InputAdornment position="end" className={classes.searchIcon}>
                        <IconButton className={classes.searchIconButton}>
                            <SearchIcon color="primary" />
                        </IconButton>
                    </InputAdornment>
                )}
                classes={{
                    root: classes.searchBox,
                    input: classes.searchInput,
                }}
            />
        </Box>
    )
}