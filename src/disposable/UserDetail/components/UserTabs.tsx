import React, { FC, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Tabs, Tab, Box, Grid } from '@material-ui/core'

import { UserDetail } from '../../../@types'

import { TabPanel } from '../../../reusable/TabPanel'
import { ProductImage } from '../../../reusable/ProductImage'

interface Props {
    user: UserDetail
}

const useStyles = makeStyles(theme =>
    createStyles({
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
        list: {
            '&::after': {
                content: "''",
                flex: 'auto',
            },
        },
        productImage: {
            width: '96px',
            height: '134.4px',
            backgroundColor: theme.palette.common.black,
            borderRadius: '10px',
        },
        emptyBox: {
            height: '135px',
        },
    })
)

export const UserTabs: FC<Props> = props => {
    const classes = useStyles()

    const [value, setValue] = useState<number>(0)
    const tabChange = (event: React.ChangeEvent, newValue: number) => setValue(newValue)

    return (
        <>
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
                    label={`参加した作品 ${props.user.reviews_count}`}
                    classes={{
                        root: classes.tab,
                        selected: classes.selected,
                    }}
                />
                <Tab
                    label={`Likeした作品 ${props.user.wannas_count}`}
                    classes={{
                        root: classes.tab,
                        selected: classes.selected,
                    }}
                />
            </Tabs>
            <TabPanel value={value} index={0} >
                {props.user.reviews_count !== 0 && props.user.reviews && (
                    <Grid
                        container
                        justify="space-between"
                        className={classes.list}
                    >
                        {props.user.reviews.slice(0, 12).map(review => (
                            <ProductImage
                                key={review.id}
                                product={review.product}
                                className={{ height: '134.4px', width: '96px', margin: '0 8px' }}
                            />
                        ))}
                    </Grid>
                )}
                {props.user.reviews_count === 0 && (
                    <Box className={classes.emptyBox}>
                        <p>まだ参加した作品はありません</p>
                    </Box>
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.user.wannas_count !== 0 && props.user.wannas && (
                    <Grid
                        container
                        justify="space-between"
                        className={classes.list}
                    >
                        {props.user.wannas.slice(0, 12).map(wanna => (
                            <ProductImage
                                key={wanna.id}
                                product={wanna.product}
                                className={{ height: '134.4px', width: '96px', margin: '0 8px'}}
                            />
                        ))}
                    </Grid>
                )}
                {props.user.wannas_count === 0 && (
                    <Box className={classes.emptyBox}>
                        <p>まだLIKEした作品はありません</p>
                    </Box>
                )}
            </TabPanel>
        </>
    )
}
