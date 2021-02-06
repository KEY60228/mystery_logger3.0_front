import React, { FC, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Tabs, Tab } from '@material-ui/core'

import { ProductIndex } from '../../../../@types'
import { TabPanel } from '../parts/TabPanel'

interface Props {
    products: ProductIndex[]
}

const useStyles = makeStyles(() =>
    createStyles({
        tabRoot: {
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
        productImageBox: {
            backgroundColor: '#0A0A0A',
            borderRadius: '10px',
            width: '200px',
            height: '12px',
        },
        userImage: {
            height: '96px',
            width: '96px',
            borderRadius: '50%',
            objectFit: 'cover',
            margin: '0 4px',
        },
    })
)

export const UserRankings: FC<Props> = props => {
    const classes = useStyles()

    const [value, setValue] = useState<number>(0)
    const tabChange = (event: React.ChangeEvent, newValue: number) => setValue(newValue)

    return (
        <Box className={classes.tabRoot}>
            <Tabs
                value={value}
                centered
                indicatorColor='secondary'
                onChange={tabChange}
                className={classes.tabs}
            >
                <Tab
                    classes={{
                        root: classes.tab,
                        selected: classes.selected,
                    }}
                    label='参加数が多い人'
                />
                <Tab
                    classes={{
                        root: classes.tab,
                        selected: classes.selected,
                    }}
                    label='脱出率が高い人'
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Box className={classes.outerBox}>
                    <Box className={classes.innerBox}>
                        {props.products.map((product: ProductIndex) => (
                            <img
                                key={product.id}
                                src={`${process.env.API_BASEURL}${product.image_name}`}
                                className={classes.userImage}
                            />
                        ))}
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box className={classes.outerBox}>
                    <Box className={classes.innerBox}>
                        {props.products.map((product: ProductIndex) => (
                            <img
                                key={product.id}
                                src={`${process.env.API_BASEURL}${product.image_name}`}
                                className={classes.userImage}
                            />
                        ))}
                    </Box>
                </Box>
            </TabPanel>
        </Box>
    )
}