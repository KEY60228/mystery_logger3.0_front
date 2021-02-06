import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Box, Button, Divider } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import FavoriteIcon from '@material-ui/icons/Favorite'

import { ProductDetail } from '../../../@types'

interface Props {
    product: ProductDetail
}

const useStyles = makeStyles(theme =>
    createStyles({
        productTitle: {
            lineHeight: '24px',
            fontSize: '20px',
            margin: '0',
        },
        productPhrase: {
            lineHeght: '16px',
            fontSize: '13px',
            margin: '8px 0',
        },
        descriptionCategory: {
            margin: '0',
            lineHeight: '16px',
            fontSize: '12px',
            color: '#C0C0C0',
        },
        descriptionLink: {
            margin: '0',
            lineHeight: '24px',
            fontSize: '12px',
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
        description: {
            margin: '0',
            lineHeight: '24px',
            fontSize: '12px',
            color: theme.palette.common.black,
        },
        productImage: {
            width: '160px',
            height: '224px',
            borderRadius: '10px',
            marginTop: '8px',
            objectFit: 'contain',
            verticalAlign: 'top',
            backgroundColor: theme.palette.common.black,
        },
        ratings: {
            marginTop: '16px',
        },
        ratingLabel: {
            margin: '0 8px',
        },
        productProperties: {
            marginLeft: '16px',
            flexGrow: 1,
        },
        divider: {
            margin: '8px 0',
        },
        buttons: {
            marginTop: '24px',
        },
        reviewButton: {
            borderRadius: '10px',
            padding: '0 16px',
            flexGrow: 1,
        },
        reviewLabel: {
            lineHeight: '16px',
            fontSize: '14px',
            marginLeft: '16px',
            fontWeight: 'bold',
        },
        favoriteButton: {
            minWidth: '48px',
            height: '48px',
            padding: '0',
            marginLeft: '8px',
            borderRadius: '10px',
            border: '3px solid'
        },
        lastDivider: {
            margin: '24px 0 16px',
        },
    })
)

export const ProductContents: FC<Props> = props => {
    const classes = useStyles()

    const getLimitTime = (time: number | null) => {
        if (time === null) {
            return <span>不明</span>
        } else if (time === 0) {
            return <span>制限時間なし</span>
        } else {
            return <span>{time}分</span>
        }
    }

    const getRequiredTime = (time: number | null) => {
        if (time === null) {
            return <span>不明</span>
        } else {
            return <span>約{time}分(目安)</span>
        }
    }

    const getParty = (min: number | null, max: number | null) => {
        if (min === null && max === null) {
            return <span>不明</span>
        }
        if (min === 0) {
            if (max === 0) {
                return <span>制限なし</span>
            } else {
                return <span>{`最大${max}人`}</span>
            }
        } else {
            if (max === 0) {
                return <span>{`最小${min}人`}</span>
            } else {
                return <span>{`${min}人〜${max}人`}</span>
            }
        }
    }

    return (
        <>
            <h1 className={classes.productTitle}>{props.product.name}</h1>
            <p className={classes.productPhrase}>{props.product.phrase}</p>
            <Grid container wrap="nowrap">
                <Box>
                    <p className={classes.descriptionCategory}>Provided by</p>
                    <p className={classes.descriptionLink}>{props.product.organizer.service_name}</p>
                    <img 
                        src={`${process.env.API_BASEURL}${props.product.image_name}`}
                        className={classes.productImage}
                    />
                    <Grid container alignItems='center' className={classes.ratings}>
                        <Rating
                            value={
                                props.product.avg_rating === 0 || props.product.avg_rating === null ? 0 : parseFloat(props.product.avg_rating.toFixed(1))
                            }
                            precision={0.1}
                            readOnly
                            size='medium'
                        />
                        <p className={classes.ratingLabel}>{props.product.avg_rating === 0 || props.product.avg_rating === null ? '-' : props.product.avg_rating.toFixed(1)}</p>
                    </Grid>
                </Box>
                <Box className={classes.productProperties}>
                    <p className={classes.descriptionCategory}>開催中の会場</p>
                    {props.product.performances.map(performance => (
                        <React.Fragment key={performance.id}>
                            <span className={classes.descriptionLink}>{performance.venue.name}</span>
                            {performance.id !== props.product.performances.slice(-1)[0].id ? (<span> / </span>) : null}
                        </React.Fragment>
                    ))}
                    <Divider className={classes.divider} />
                    <p className={classes.descriptionCategory}>カテゴリ</p>
                    <p className={classes.description}>{props.product.category.name}</p>
                    <Divider className={classes.divider} />
                    <p className={classes.descriptionCategory}>制限時間 / 所要時間</p>
                    <p className={classes.description}>{getLimitTime(props.product.limitTime)} / {getRequiredTime(props.product.requiredTime)}</p>
                    <Divider className={classes.divider} />
                    <p className={classes.descriptionCategory}>人数</p>
                    <p className={classes.description}>{getParty(props.product.minParty, props.product.maxParty)}</p>
                    <Divider className={classes.divider} />
                    <p className={classes.descriptionCategory}>成功率</p>
                    <p className={classes.description}>
                        {props.product.success_rate
                            ? `${
                                parseFloat(props.product.success_rate.toFixed(1)) *
                                100
                            }%`
                            : '-'}{' '}
                        ({props.product.success_count}/{props.product.reviews_count})
                    </p>
                </Box>
            </Grid>
            <Grid container className={classes.buttons}>
                <Button color='primary' variant='contained' className={classes.reviewButton}>
                    <DirectionsRunIcon />
                    <p className={classes.reviewLabel}>レビューを投稿する ({props.product.reviews_count})</p>
                </Button>
                <Button variant='outlined' color='primary' className={classes.favoriteButton}>
                    <FavoriteIcon color='error' />
                </Button>
            </Grid>
            <Divider className={classes.lastDivider} />
        </>
    )
}