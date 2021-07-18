import React, { FC } from 'react'
import { useHistory } from 'react-router'
import queryString from 'query-string'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider, Grid, IconButton } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import FilterListIcon from '@material-ui/icons/FilterList'
import { Pagination } from '@material-ui/lab'

import { Search } from '../../@types'
import { ProductCard } from '../../reusable/ProductCard'
import { SearchBox } from '../../reusable/SearchBox'
import { Footer } from '../../reusable/Footer'
import { SortDialog } from './components/SortDialog'
import { FilterDialog } from './components/FilterDialog'
import { headerHeight, footerHeight } from '../../util'
import { DisplayAdsCard } from '../../reusable/DisplayAdsCard'
import { ReviewAdsCard } from '../../reusable/ReviewAdsCard'

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
            margin: '24px auto 40px',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - 64px)`,
            maxWidth: '600px',
        },
        innerBox: {
            margin: '0 20px',
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
                <Box className={classes.innerBox}>
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
                    {props.results.total !== 0 && props.results.data.map((product, index) => (
                        <React.Fragment key={product.id}>
                            {(index !== 0 && index % 5 == 0) &&
                                <ReviewAdsCard/>
                            }
                            <Box>
                                <ProductCard product={product} className={{margin: '0 0 24px'}}/>
                                <Divider className={classes.divider} />
                            </Box>
                        </React.Fragment>
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
                    <DisplayAdsCard />
                </Box>
            </Box>
            <Footer />
            <SortDialog
                search={props.search}
                query={query}
                sortOpen={props.sortOpen}
                setSortOpen={props.setSortOpen}
            />
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