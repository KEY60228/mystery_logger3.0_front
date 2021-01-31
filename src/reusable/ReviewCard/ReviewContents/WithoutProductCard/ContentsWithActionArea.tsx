import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CardActionArea, Grid, Typography, Box } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { Product, Review } from '../../../../@types'
import { Ratings } from '../../../Ratings'

interface ReviewWithProduct extends Review {
    product?: Product
}

interface Props {
    review: ReviewWithProduct
    productTitle?: boolean
    getSpoiledContents?: () => void
    className?: ClassProps
}

interface ClassProps {
    minHeight?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (className: ClassProps) => ({
            minHeight: className.minHeight,
        }),
        contents: {
            whiteSpace: 'pre-wrap',
        },
        spoil: {
            color: 'red',
            fontSize: '12px',
        },
        remarks: {
            color: 'grey',
            fontSize: '12px',
            margin: '8px',
            width: '110px',
        },
        created: {
            color: 'grey',
            fontSize: '12px',
        },
    }),
)

export const ContentsWithActionArea: FC<Props> = props => {
    const classes = useStyles()

    return (
        <CardActionArea
            component={Link}
            to={`/reviews/${props.review.id}`}
            className={classes.root}
        >
            <Grid
                container
                justify="space-between"
                wrap="nowrap"
                alignItems="center"
            >
                <Grid container direction="column">
                    <Typography variant="caption" className={classes.created}>
                        {props.review.created_at}
                    </Typography>
                    {props.productTitle && props.review.product && (
                        <Typography>{props.review.product.name}</Typography>
                    )}
                    <Ratings
                        number={props.review.rating || 0}
                        size="small"
                        justify="flex-start"
                        className={{ marginLeft: '4px' }}
                    />
                    <Grid container>
                        <Typography variant="body2" className={classes.remarks}>
                            参加日: {props.review.joined_at || '-'}{' '}
                        </Typography>
                        {props.review.result === 1 && (
                            <Typography
                                variant="body2"
                                className={classes.remarks}
                            >
                                脱出成功！
                            </Typography>
                        )}
                        {props.review.result === 2 && (
                            <Typography
                                variant="body2"
                                className={classes.remarks}
                            >
                                脱出失敗…
                            </Typography>
                        )}
                    </Grid>
                    <Box className={classes.contents}>
                        {!props.review.spoil && (
                            <Typography variant="body2">
                                {props.review.exposed_contents}
                            </Typography>
                        )}
                        {props.review.spoil && (
                            <Typography
                                variant="body2"
                                onClick={props.getSpoiledContents}
                                className={classes.spoil}
                            >
                                ※ネタバレを表示する
                            </Typography>
                        )}
                    </Box>
                </Grid>
                <NavigateNextIcon />
            </Grid>
        </CardActionArea>
    )
}
