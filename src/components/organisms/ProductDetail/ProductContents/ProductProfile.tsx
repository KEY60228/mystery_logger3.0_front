import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Grid, Card, Typography } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { ProductDetail } from '../../../../@types'

interface Props {
    product: ProductDetail
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: '6px',
            marginRight: '12px',
        },
        subtitle: {
            fontSize: '14px',
            margin: '4px',
            backgroundColor: 'gainsboro',
            width: '100%',
        },
        card: {
            margin: '4px',
        },
        body: {
            fontSize: '12px',
            marginLeft: '4px',
        },
    }),
)

export const ProductProfile: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()

    const getParty = (min: number | null, max: number | null) => {
        if (min === null && max === null) {
            return (
                <Typography variant="body1" className={classes.body}>
                    不明
                </Typography>
            )
        }
        if (min === 0) {
            if (max === 0) {
                return (
                    <Typography variant="body1" className={classes.body}>
                        制限なし
                    </Typography>
                )
            } else {
                return (
                    <Typography
                        variant="body1"
                        className={classes.body}
                    >{`最大${max}人`}</Typography>
                )
            }
        } else {
            if (max === 0) {
                return (
                    <Typography
                        variant="body1"
                        className={classes.body}
                    >{`最小${min}人`}</Typography>
                )
            } else {
                return (
                    <Typography
                        variant="body1"
                        className={classes.body}
                    >{`${min}人〜${max}人`}</Typography>
                )
            }
        }
    }

    const getLimitTime = (time: number | null) => {
        if (time === null) {
            return <>不明</>
        } else if (time === 0) {
            return <>制限時間なし</>
        } else {
            return <>{time}分</>
        }
    }

    const getRequiredTime = (time: number | null) => {
        if (time === null) {
            return <>不明</>
        } else {
            return <>約{time}分(目安)</>
        }
    }

    return (
        <Grid container direction="column" className={classes.root}>
            <Typography variant="subtitle1" className={classes.subtitle}>
                制作会社
            </Typography>
            <Card
                onClick={() =>
                    history.push(`/organizers/${props.product.organizer.id}`)
                }
                className={classes.card}
            >
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    wrap="nowrap"
                >
                    <Typography variant="body1" className={classes.body}>
                        {props.product.organizer.service_name}
                    </Typography>
                    <NavigateNextIcon />
                </Grid>
            </Card>
            <Typography variant="subtitle1" className={classes.subtitle}>
                開催地
            </Typography>
            <Grid container direction="column">
                {props.product.performances.map(performance => (
                    <Card
                        key={performance.id}
                        onClick={() =>
                            history.push(`/venues/${performance.venue_id}`)
                        }
                        className={classes.card}
                    >
                        <Grid
                            container
                            justify="space-between"
                            alignItems="center"
                            wrap="nowrap"
                        >
                            <Typography
                                variant="body1"
                                className={classes.body}
                            >
                                {performance.venue.name}
                            </Typography>
                            <NavigateNextIcon />
                        </Grid>
                    </Card>
                ))}
            </Grid>
            <Typography variant="subtitle1" className={classes.subtitle}>
                カテゴリ
            </Typography>
            <Typography variant="body1" className={classes.body}>
                {props.product.category.name}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
                制限時間 / 所要時間
            </Typography>
            <Typography variant="body1" className={classes.body}>
                {getLimitTime(props.product.limitTime)} /{' '}
                {getRequiredTime(props.product.requiredTime)}
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
                人数
            </Typography>
            {getParty(props.product.minParty, props.product.maxParty)}
            <Typography variant="subtitle1" className={classes.subtitle}>
                成功率
            </Typography>
            <Typography variant="body1" className={classes.body}>
                {props.product.success_rate
                    ? `${
                          parseFloat(props.product.success_rate.toFixed(1)) *
                          100
                      }%`
                    : '-'}{' '}
                ({props.product.success_count}/{props.product.reviews_count})
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
                募集中の同行者募集
            </Typography>
            <Card
                onClick={() => history.push(`/accompany`)}
                className={classes.card}
            >
                <Grid container justify="space-between" alignItems="center">
                    <Typography variant="body1" className={classes.body}>
                        0件
                    </Typography>
                    <NavigateNextIcon />
                </Grid>
            </Card>
        </Grid>
    )
}
