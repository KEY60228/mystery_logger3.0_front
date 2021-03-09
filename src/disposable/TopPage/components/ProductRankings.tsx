import React, { FC, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Tabs, Tab } from '@material-ui/core'

import { PropsForTopPage } from '../../../@types'
import { TabPanel } from '../../../reusable/TabPanel'
import { ProductImage } from '../../../reusable/ProductImage'

interface Props {
    products: PropsForTopPage
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            marginTop: '40px',
        },
        tabs: {
            marginBottom: '16px',
            minHeight: '24px',
        },
        tab: {
            color: '#0A0A0A',
            width: '104px',
            margin: '0 8px',
            padding: '8px 0',
            fontSize: '12px',
            lineHeight: '16px',
            minHeight: '24px',
        },
        selected: {
            color: '#FFAC00',
        },
        outerBox: {
            overflowX: 'scroll',
        },
        innerBox: {
            display: 'inline-block',
            whiteSpace: 'nowrap',
            width: '100%',
        },
    })
)

export const ProductRankings: FC<Props> = (props) => {
    const classes = useStyles()

    const [value, setValue] = useState<number>(0)
    const tabChange = (event: React.ChangeEvent, newValue: number) => setValue(newValue)

    return (
        <Box className={classes.root}>
            <Tabs
                value={value}
                centered
                indicatorColor='secondary'
                onChange={tabChange}
                classes={{
                    root: classes.tabs,
                }}
            >
                <Tab
                    classes={{
                        root: classes.tab,
                        selected: classes.selected,
                    }}
                    label='評価の高い作品'
                />
                <Tab
                    classes={{
                        root: classes.tab,
                        selected: classes.selected,
                    }}
                    label='投稿数の多い作品'
                />
                <Tab
                    classes={{
                        root: classes.tab,
                        selected: classes.selected,
                    }}
                    label='成功率の低い作品'
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Box className={classes.outerBox}>
                    <Box className={classes.innerBox}>
                        {props.products.products_sortby_ratings.map(product => (
                            <ProductImage
                                key={product.id}
                                product={product}
                                className={{height: '168px', width: '120px', margin: '0 4px'}}
                            />
                        ))}
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box className={classes.outerBox}>
                    <Box className={classes.innerBox}>
                        {props.products.products_sortby_reviews_count.map(product => (
                            <ProductImage
                                key={product.id}
                                product={product}
                                className={{height: '168px', width: '120px', margin: '0 4px'}}
                            />
                        ))}
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Box className={classes.outerBox}>
                    <Box className={classes.innerBox}>
                        {props.products.products_sortby_success_rate.map(product => (
                            <ProductImage
                                key={product.id}
                                product={product}
                                className={{height: '168px', width: '120px', margin: '0 4px'}}
                            />
                        ))}
                    </Box>
                </Box>
            </TabPanel>
        </Box>
    )
}