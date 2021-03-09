import React, { FC, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Tabs, Tab } from '@material-ui/core'

import { PropsForTopPage } from '../../../@types'
import { TabPanel } from '../../../reusable/TabPanel'
import { UserImage } from '../../../reusable/UserImage'

interface Props {
    users: PropsForTopPage
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
        images: {
            width: '96px',
            margin: '0 4px',
            display: 'inline-block',
        },
        label: {
            lineHeight: '16px',
            fontSize: '12px',
            margin: '8px 0 0',
            width: '96px',
            textAlign: 'center',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
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
                        {props.users.users_sortby_reviews_count.map(user => (
                            <Box key={user.id} className={classes.images}>
                                <UserImage
                                    user={user}
                                    className={{height: '96px', width: '96px'}}
                                />
                                <p className={classes.label}>{user.name}</p>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box className={classes.outerBox}>
                    <Box className={classes.innerBox}>
                        {props.users.users_sortby_success_rate.map(user => (
                            <Box key={user.id} className={classes.images}>
                                <UserImage
                                    user={user}
                                    className={{height: '96px', width: '96px'}}
                                />
                                <p className={classes.label}>{user.name}</p>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </TabPanel>
        </Box>
    )
}