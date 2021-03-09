import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles(theme =>
    createStyles({
        image: {
            width: '100%',
            height: '192px',
            objectFit: 'cover',
            verticalAlign: 'top',
        },
        banner: {
            backgroundImage: 'url(./img/Banner.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100%',
            height: '192px',
            padding: '16px 20px',
        },
        bannerInner: {
            backgroundColor: 'rgba(192, 192, 192, 0.4)',
            position: 'relative',
            height: '100%',
            width: '100%',
        },
        bannerUpperLabel: {
            lineHeight: '32px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: theme.palette.common.black,
            margin: '0',
            textAlign: 'right',
        },
        bannerBottomLabels: {
            position: 'absolute',
            bottom: '0',
        },
        bannerBottomLabel: {
            lineHeight: '32px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: theme.palette.common.black,
            margin: '0',
        },
    }),
)

export const Banner: FC = () => {
    const classes = useStyles()
    
    return (
        <div className={classes.banner}>
            <div className={classes.bannerInner}>
                <p className={classes.bannerUpperLabel}>謎解き・脱出ゲーム探すなら、Nazolog</p>
                <div className={classes.bannerBottomLabels}>
                    <p className={classes.bannerBottomLabel}>あなたが解きたい謎も、解けない謎も、</p>
                    <p className={classes.bannerBottomLabel}>きっと見つかる</p>
                </div>
            </div>
        </div>
    )
}