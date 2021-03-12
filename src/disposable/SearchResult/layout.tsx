import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider, Grid, IconButton } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import FilterListIcon from '@material-ui/icons/FilterList'

import { ProductIndex } from '../../@types'
import { ProductCard } from '../../reusable/ProductCard'
import { SearchBox } from '../../reusable/SearchBox'
import { Footer } from '../../reusable/Footer'

interface Props {
    results: ProductIndex[]
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
    })
)

export const SearchResultTemplate: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <SearchBox className={{margin: '0 0 16px', padding: '0'}} />
                <Grid container justify='space-between' wrap='nowrap' className={classes.properties}>
                    <p className={classes.label}>1-20件 / {props.results.length}件中</p>
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
                {props.results.length !== 0 && props.results.map(product => (
                    <Box key={product.id}>
                        <ProductCard product={product} className={{margin: '0 0 24px'}}/>
                        <Divider className={classes.divider} />
                    </Box>
                ))} 
                {props.results.length === 0 &&
                    <div>該当の作品はありません。</div>
                }
            </Box>
            <Footer />
        </>
    )
}