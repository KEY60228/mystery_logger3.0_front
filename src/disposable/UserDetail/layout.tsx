import React, { FC, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Grid, Button, IconButton, Divider, Tabs, Tab } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { UserDetail } from '../../@types'
import { UserStatics } from './components/UserStatics'
import { Footer } from '../../reusable/Footer/Footer'

import { TabPanel } from '../TopPage/components/parts/TabPanel'
import { theme } from '../../theme'

interface Props {
    user: UserDetail
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '16px 20px 24px',
        },
        userBox: {
            marginLeft: '16px',
        },
        userImage: {
            height: '88px',
            width: '88px',
            borderRadius: '50%',
        },
        userProperty: {
            lineHeight: '24px',
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0',
            textAlign: 'center',
        },
        userPropertyLabel: {
            lineHeight: '16px',
            fontSize: '12px',
            margin: '0',
            textAlign: 'center',
        },
        buttons: {
            marginTop: '16px',
        },
        followButton: {
            minHeight: '32px',
            marginRight: '16px',
            borderRadius: '10px',
            flexGrow: 1,
            padding: 0,
        },
        followButtonLabel: {
            margin: '0',
            lineHeight: '24px',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        menuButton: {
            height: '32px',
            width: '32px',
        },
        userName: {
            margin: '16px 0 0',
            lineHeight: '24px',
            fontSize: '15px',
        },
        userAccountId: {
            margin: '0',
            lineHeight: '16px',
            fontSize: '12px',
            color: '#C0C0C0',
        },
        userProfile: {
            lineHeight: '16px',
            fontSize: '12px',
            margin: '8px 8px 0',
        },
        divider: {
            marginTop: '16px',
        },
        staticDivider: {
            margin: '24px 0',
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
        lastDivider: {
            margin: '40px 0',
        },
    })
)

export const UserDetailTemplate: FC<Props> = props => {
    const classes = useStyles()

    const [value, setValue] = useState<number>(0)
    const tabChange = (event: React.ChangeEvent, newValue: number) => setValue(newValue)

    return (
        <>
            <Box className={classes.root}>
                <Grid container wrap='nowrap'>
                    <img
                        src={`${process.env.API_BASEURL}${props.user.image_name}`}
                        className={classes.userImage}
                    />
                    <Grid container direction='column' className={classes.userBox}>
                        <Grid container justify='space-between' wrap='nowrap'>
                            <Grid container direction='column'>
                                <p className={classes.userProperty}>{props.user.follows_count}</p>
                                <p className={classes.userPropertyLabel}>フォロー</p>
                            </Grid>
                            <Grid container direction='column'>
                                <p className={classes.userProperty}>{props.user.followers_count}</p>
                                <p className={classes.userPropertyLabel}>フォロワー</p>
                            </Grid>
                            <Grid container direction='column'>
                                <p className={classes.userProperty}>
                                    {props.user.success_rate
                                        ? `${(props.user.success_rate * 100).toFixed(1)}%`
                                        : '-'
                                    }
                                </p>
                                <p className={classes.userPropertyLabel}>成功率</p>
                            </Grid>
                        </Grid>
                        <Grid container wrap='nowrap' className={classes.buttons}>
                            <Button variant='contained' color='primary' className={classes.followButton}>
                                <p className={classes.followButtonLabel}>フォロー</p>
                            </Button>
                            <IconButton className={classes.menuButton}>
                                <MoreHorizIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <p className={classes.userName}>{props.user.name}</p>
                <p className={classes.userAccountId}>@{props.user.account_id}</p>
                <p className={classes.userProfile}>{props.user.profile}</p>
                <Divider className={classes.divider} />
                <UserStatics user={props.user} />
                <Divider className={classes.staticDivider} />
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
                                <img
                                    key={review.id}
                                    src={`${process.env.API_BASEURL}${review.product.image_name}`}
                                    className={classes.productImage}
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
                                <img
                                    key={wanna.id}
                                    src={`${process.env.API_BASEURL}${wanna.product.image_name}`}
                                    className={classes.productImage}
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
                <Divider className={classes.lastDivider} />
            </Box>
            <Footer />
        </>
    )
}