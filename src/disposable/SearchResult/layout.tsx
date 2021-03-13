import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider, Grid, IconButton } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import FilterListIcon from '@material-ui/icons/FilterList'
import { Pagination } from '@material-ui/lab'
import queryString from 'query-string'

import { Search } from '../../@types'
import { ProductCard } from '../../reusable/ProductCard'
import { SearchBox } from '../../reusable/SearchBox'
import { Footer } from '../../reusable/Footer'

interface Props {
    search: string
    results: Search
    keywords: string
    setKeywords: React.Dispatch<React.SetStateAction<string>>
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '24px 20px',
        },
        searchBox: {
            margin: '0 0 16px',
            padding: '0',
        },
        properties: {
            margin: '0 0 16px',
        },
        label: {
            margin: '0',
            lineHeight: '24px',
            fontSize: '14px',
            color: '#C0C0C0',
            display: 'inline-block',
            verticalAlign: 'top',
        },
        filters: {
            height: '24px',
        },
        icon: {
            color: '#C0C0C0',
            margin: '0 0 0 8px',
            padding: '0',
        },
        divider: {
            margin: '0 0 24px',
        },
        paginationBox: {
            textAlign: 'center',
        },
        paginationRoot: {
            display: 'inline-block',
        },
    })
)

export const SearchResultTemplate: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()
    const query = queryString.parse(props.search)

    const paginate = (ev: React.ChangeEvent<unknown>, page: number) => {
        if (query.page) {
            const url = props.search.replace(`page=${query.page}`, `page=${page}`)
            history.push(`/search${url}`)
        } else if (props.search.indexOf('?') !== -1) {
            history.push(`/search${props.search}&page=${page}`)
        } else {
            history.push(`/search?page=${page}`)
        }
    }

    return (
        <>
            <Box className={classes.root}>
                <SearchBox
                    keywords={props.keywords}
                    setKeywords={props.setKeywords}
                    className={{margin: '0 0 16px', padding: '0'}}
                />
                <Grid container justify='space-between' wrap='nowrap' className={classes.properties}>
                    <p className={classes.label}>
                        {props.results.data.length ? (
                            `${props.results.from}-${props.results.to}件 / ${props.results.total}件中`
                        ) : (
                            '0件'
                        )}
                    </p>
                    <Box className={classes.filters}>
                        <IconButton className={classes.icon} >
                            <FilterListIcon />
                            <p className={classes.label}>絞り込み</p>
                        </IconButton>
                        <IconButton className={classes.icon}>
                            <SortIcon />
                            <p className={classes.label}>ソート</p>
                        </IconButton>
                    </Box>
                </Grid>
                <Divider className={classes.divider} />
                {props.results.total !== 0 && props.results.data.map(product => (
                    <Box key={product.id}>
                        <ProductCard product={product} className={{margin: '0 0 24px'}}/>
                        <Divider className={classes.divider} />
                    </Box>
                ))} 
                {props.results.total === 0 &&
                    <div>該当の作品はありません。</div>
                }
                <Box className={classes.paginationBox}>
                    <Pagination
                        color='primary'
                        variant='outlined'
                        shape='rounded'
                        size='small'
                        page={props.results.current_page}
                        count={props.results.last_page}
                        onChange={(ev, page) => paginate(ev, page)}
                        classes={{root: classes.paginationRoot}}
                    />
                </Box>
            </Box>
            <Footer />
        </>
    )
}