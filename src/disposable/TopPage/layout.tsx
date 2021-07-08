import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { PropsForTopPage } from '../../@types'

import { Banner } from './components/Banner'
import { ProductRankings } from './components/ProductRankings'
import { ProductsByCategory } from './components/ProductsByCategory'
import { UserRankings } from './components/UserRankings'
import { SearchBox } from '../../reusable/SearchBox'
import { Footer } from '../../reusable/Footer'
import { headerHeight, footerHeight } from '../../util'

interface Props {
    products: PropsForTopPage
    keywords: string
    setKeywords: React.Dispatch<React.SetStateAction<string>>
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '0 auto 40px',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight})`,
            maxWidth: '600px',
        },
    })
)

export const TopPageTemplate: FC<Props> = props => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <Banner />
                <ProductRankings products={props.products} />
                <SearchBox
                    keywords={props.keywords}
                    setKeywords={props.setKeywords}
                />
                <ProductsByCategory products={props.products} />
                <UserRankings users={props.products} />
            </Box>
            <Footer />
        </>
    )
}
