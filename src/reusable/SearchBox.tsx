import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, OutlinedInput, InputAdornment, IconButton, FormControl } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { setPopper } from '../stores/error'
import { useAppDispatch } from '../stores'

interface Props {
    keywords: string
    setKeywords: React.Dispatch<React.SetStateAction<string>>
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
        form: {
            width: '100%',
        },
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
    const history = useHistory()
    const dispatch = useAppDispatch()

    const search = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault()
        if (props.keywords) {
            history.push(`/search?keywords=${props.keywords}`)
        } else {
            dispatch(setPopper('keywords are blank'))
        }
    }

    return (
        <Box className={classes.search}>
            <form>
                <FormControl className={classes.form}>
                    <OutlinedInput
                        placeholder="作品名、会場名、キーワードで検索"
                        color="primary"
                        endAdornment={(
                            <InputAdornment position="end" className={classes.searchIcon}>
                                <IconButton
                                    type='submit'
                                    onClick={search}
                                    className={classes.searchIconButton}
                                >
                                    <SearchIcon color="primary" />
                                </IconButton>
                            </InputAdornment>
                        )}
                        value={props.keywords}
                        onChange={ev => props.setKeywords(ev.target.value)}
                        classes={{
                            root: classes.searchBox,
                            input: classes.searchInput,
                        }}
                    />
                </FormControl>
            </form>
        </Box>
    )
}