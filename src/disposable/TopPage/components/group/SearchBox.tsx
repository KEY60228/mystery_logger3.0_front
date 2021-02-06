import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(() =>
    createStyles({
        search: {
            margin: '40px 0',
            padding: '0 44px',
        },
        searchBox: {
            padding: '0',
            width: '100%',
            height: '24px',
            boxShadow: '1px 1px #0A0A0A',
        },
        searchInput: {
            padding: '0 0 0 8px',
            lineHeight: '24px',
            fontSize: '12px',
        },
        searchIcon: {
            width: '24px',
            height: '24px',
        },
        searchIconButton: {
            padding: '0px',
        },
    })
)

export const SearchBox: FC = () => {
    const classes = useStyles()

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