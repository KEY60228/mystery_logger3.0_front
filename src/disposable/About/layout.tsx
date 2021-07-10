import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { Footer } from '../../reusable/Footer'
import { footerHeight, headerHeight } from '../../util'

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '8px auto 40px',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - 48px)`,
            maxWidth: '600px',
        },
        innerBox: {
            margin: '0 8px',
        },
        description: {
            color: 'red',
            fontWeight: 'bold',
        },
        subBox: {
            margin: '0 16px',
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    })
)

export const AboutTemplate: FC = () => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.innerBox}>
                    <h3>なぞログとは？</h3>
                    <div className={classes.subBox}>
                        <p>『<span className={classes.description}>謎解きや脱出ゲーム等のポータルサイト</span>』です</p>
                        <p>行った作品のレビューを記録したり、気になる作品の検索ができます！</p>
                    </div>
                    <h4>サービスの機能</h4>
                    <ul>
                        <li>参加した作品、イベントのレビューや成否の記録</li>
                        <li>参加したい作品の記録</li>
                        <li>レビューへのコメント、LIKE</li>
                        <li>気になるユーザーのフォロー</li>
                        <li>フォローしたユーザーのレビューの一覧(タイムライン)</li>
                        <li>気になる作品の検索</li>
                        <li>作品やユーザーのランキングの確認</li>
                        <li>などなど...</li>
                    </ul>
                    <h4>今後追加したい機能</h4>
                    <ul>
                        <li>同行者の募集</li>
                        <li>近くのイベントの検索</li>
                        <li>イベント参加予定カレンダー</li>
                        <li>などなど...</li>
                    </ul>
                    <h4>規約等について</h4>
                    <div className={classes.subBox}>
                        <p>利用規約は<Link to='/kiyaku' className={classes.link}>こちら</Link></p>
                        <p>プライバシーポリシーは<Link to='/policy' className={classes.link}>こちら</Link></p>
                        <p>コミュニティガイドラインは<Link to='/guideline' className={classes.link}>こちら</Link></p>
                    </div>
                    <h4>運営者について</h4>
                    <div className={classes.subBox}>
                        <p>なぞログは謎解き好きな1人のプログラマーが運営しています。</p>
                        <p>まだまだ未熟で至らない点が多いかと思いますが、何卒ご容赦ください。</p>
                    </div>
                </Box>
            </Box>
            <Footer />
        </>
    )
}
