import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Tabs, Tab } from '@material-ui/core'

import { PropsForTopPage } from '../../../@types'
import { TabPanel } from '../../../reusable/TabPanel'

interface Props {
    products: PropsForTopPage
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {

        },
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
        images: {
            width: '120px',
            margin: '0 4px',
            display: 'inline-block',
        },
        image: {
            height: '168px',
            width: '120px',
            margin: '0 4px',
            backgroundColor: theme.palette.common.black,
            objectFit: 'contain',
            borderRadius: '10px',
            verticalAlign: 'top',
        },
        label: {
            lineHeight: '16px',
            fontSize: '12px',
            margin: '8px 0 0',
            width: '120px',
            textAlign: 'center',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
    })
)

export const ProductsByCategory: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()

    const [value, setValue] = useState<number>(0)
    const tabChange = (event: React.ChangeEvent, newValue: number) => setValue(newValue)

    return (
        <Box className={classes.root}>
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
                    label='主催団体別'
                />
                <Tab
                    classes={{
                        root: classes.tab,
                        selected: classes.selected,
                    }}
                    label='地域・会場別'
                />
                <Tab
                    classes={{
                        root: classes.tab,
                        selected: classes.selected,
                    }}
                    label='カテゴリー別'
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Box className={classes.outerBox}>
                    <Box className={classes.innerBox}>
                        {props.products.products_categorizeby_organizer.map(product => (
                            <Box key={product.id} className={classes.images}>
                                <img
                                    src={`${process.env.IMAGES_BASEURL}${product.image_name}`}
                                    onClick={() => history.push(`/search?organizer=${product.organizer_id}`)}
                                    className={classes.image}
                                />
                                <p className={classes.label}>{product.organizer_name}</p>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box className={classes.outerBox}>
                    <Box className={classes.innerBox}>
                        {props.products.products_categorizeby_venue.map(product => (
                            <Box key={product.id} className={classes.images}>
                                <img
                                    src={`${process.env.IMAGES_BASEURL}${product.image_name}`}
                                    onClick={() => history.push(`/search?pref=${product.addr_pref_id}`)}
                                    className={classes.image}
                                />
                                <p className={classes.label}>{product.addr_prefecture}</p>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Box className={classes.outerBox}>
                    <Box className={classes.innerBox}>
                        {props.products.products_categorizeby_category.map(product => (
                            <Box key={product.id} className={classes.images}>
                                <img
                                    src={`${process.env.IMAGES_BASEURL}${product.image_name}`}
                                    onClick={() => history.push(`/search?category=${product.category_id}`)}
                                    className={classes.image}
                                />
                                <p className={classes.label}>{product.category_name}</p>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </TabPanel>
        </Box>
    )
}
