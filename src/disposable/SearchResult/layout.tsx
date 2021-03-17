import React, { FC } from 'react'
import { useHistory } from 'react-router'
import queryString from 'query-string'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider, Drawer, Grid, IconButton } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import FilterListIcon from '@material-ui/icons/FilterList'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { Pagination } from '@material-ui/lab'

import { Search } from '../../@types'
import { ProductCard } from '../../reusable/ProductCard'
import { SearchBox } from '../../reusable/SearchBox'
import { Footer } from '../../reusable/Footer'
import { FilterDialog } from './components/FilterDialog'

interface Props {
    search: string
    results: Search
    keywords: string
    setKeywords: React.Dispatch<React.SetStateAction<string>>
    sortOpen: boolean
    setSortOpen: React.Dispatch<React.SetStateAction<boolean>>
    filterOpen: boolean
    setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>
    organizers: OrganizerProp[]|null
    venues: VenueProp[][]|null
    organizer: string
    setOrganizer: React.Dispatch<React.SetStateAction<string>>
    venue: string
    setVenue: React.Dispatch<React.SetStateAction<string>>
    pref: string
    setPref: React.Dispatch<React.SetStateAction<string>>
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

// 後ほどリファクタリング対象か
interface OrganizerProp {
    id: number
    service_name: string
    company_name: string
}
interface VenueProp {
    id: number
    name: string
    addr_pref_id: number
    addr_prefecture: string
    service_name: string
}

const useStyles = makeStyles(theme =>
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
        drawerLabel: {
            color: theme.palette.primary.main,
            marginLeft: '16px',
            lineHeight: '24px',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        drawer: {
            backgroundColor: theme.palette.common.black,
        },
        closeButton: {
            float: 'right',
        },
        selectLabel: {
            margin: '16px 0 16px 40px',
            lineHeight: '24px',
            fontSize: '14px',
        },
        selected: {
            margin: '16px 0',
            color: theme.palette.primary.main,
            lineHeight: '24px',
            fontSize: '14px',
        },
        check: {
            margin: '16px 8px',
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

    const sort = (ranking: number) => {
        let param = props.search
        if (query.page) {
            param = props.search.replace(`&page=${query.page}`, '')
        }
        if (query.ranking) {
            param = param.replace(`ranking=${query.ranking}`, `ranking=${ranking}`)
            props.setSortOpen(false)
            history.push(`/search${param}`)
        } else if (props.search.indexOf('?') !== -1) {
            props.setSortOpen(false)
            history.push(`/search${props.search}&ranking=${ranking}`)
        } else {
            props.setSortOpen(false)
            history.push(`/search?ranking=${ranking}`)
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
                <Grid container justify='space-between' alignItems='center' wrap='nowrap' className={classes.properties}>
                    <p className={classes.label}>
                        {props.results.data.length ? (
                            `${props.results.from}-${props.results.to}件 / ${props.results.total}件中`
                        ) : (
                            '0件'
                        )}
                    </p>
                    <Box className={classes.filters}>
                        <IconButton onClick={() => props.setFilterOpen(true)} className={classes.icon} >
                            <FilterListIcon />
                            <p className={classes.label}>絞り込み</p>
                        </IconButton>
                        <IconButton onClick={() => props.setSortOpen(true)} className={classes.icon}>
                            <SortIcon />
                            <p className={classes.label}>並び替え</p>
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
            <Drawer
                anchor='bottom'
                open={props.sortOpen}
                onClose={() => props.setSortOpen(false)}
            >
                <Box className={classes.drawer}>
                    <Grid container justify='space-between' wrap='nowrap'>
                        <p className={classes.drawerLabel}>並び替え</p>
                        <IconButton onClick={() => props.setSortOpen(false)} className={classes.closeButton}>
                            <CloseIcon color='primary' />
                        </IconButton>
                    </Grid>
                </Box>
                <Grid container wrap='nowrap' onClick={() => sort(1)}>
                    {query.ranking === '1' &&
                        <>
                            <CheckIcon color='primary' className={classes.check} />
                            <p className={classes.selected}>評価が高い順</p>
                        </>
                    }
                    {query.ranking !== '1' &&
                        <p className={classes.selectLabel}>評価が高い順</p>
                    }
                </Grid>
                <Divider />
                <Grid container wrap='nowrap' onClick={() => sort(2)}>
                    {query.ranking === '2' &&
                        <>
                            <CheckIcon color='primary' className={classes.check} />
                            <p className={classes.selected}>投稿数が多い順</p>
                        </>
                    }
                    {query.ranking !== '2' &&
                        <p className={classes.selectLabel}>投稿数が多い順</p>
                    }
                </Grid>
                <Divider />
                <Grid container wrap='nowrap' onClick={() => sort(3)}>
                    {query.ranking === '3' &&
                        <>
                            <CheckIcon color='primary' className={classes.check} />
                            <p className={classes.selected}>成功率が低い順</p>
                        </>
                    }
                    {query.ranking !== '3' &&
                        <p className={classes.selectLabel}>成功率が低い順</p>
                    }
                </Grid>
                <Divider />
                <Grid container wrap='nowrap' onClick={() => sort(4)}>
                    {query.ranking === '4' &&
                        <>
                            <CheckIcon color='primary' className={classes.check} />
                            <p className={classes.selected}>成功率が高い順</p>
                        </>
                    }
                    {query.ranking !== '4' &&
                        <p className={classes.selectLabel}>成功率が高い順</p>
                    }
                </Grid>
                <Divider />
                <Grid container wrap='nowrap' onClick={() => sort(5)}>
                    {query.ranking === '5' &&
                        <>
                            <CheckIcon color='primary' className={classes.check} />
                            <p className={classes.selected}>Likeの多い順</p>
                        </>
                    }
                    {query.ranking !== '5' &&
                        <p className={classes.selectLabel}>Likeの多い順</p>
                    }
                </Grid>
            </Drawer>
            <FilterDialog
                open={props.filterOpen}
                setOpen={props.setFilterOpen}
                organizers={props.organizers}
                venues={props.venues}
                organizer={props.organizer}
                setOrganizer={props.setOrganizer}
                venue={props.venue}
                setVenue={props.setVenue}
                pref={props.pref}
                setPref={props.setPref}
                category={props.category}
                setCategory={props.setCategory}
                search={props.search}
            />
        </>
    )
}