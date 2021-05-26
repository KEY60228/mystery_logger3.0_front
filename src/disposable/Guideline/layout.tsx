import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { Footer } from '../../reusable/Footer'

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '8px',
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        }
    })
)

export const GuidelineTemplate: FC = () => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <h3>コミュニティガイドライン</h3>
                <p>なぞログは1人でも多くの方に謎解きを知ってもらいたい、好きになってもらいたい、という想いから作られたサービスです。</p>
                <p>誰もが楽しく便利になぞログを利用していただくために、本ガイドラインを参照してください。</p>
                <p>運営者は、本ガイドラインを違反しているコンテンツ、もしくはユーザーについて、必要な措置をとる場合があります。</p>
                <p>また、本ガイドラインは随時変更する可能性があります。</p>
                <b>気持ちの良いやりとりを心がけましょう。</b>
                <p>好みや価値観、レビューの書き方は人それぞれです。また、楽しみ方も十人十色です。</p>
                <p>脱出成功率は優劣を決めるものではありません。</p>
                <p>一方的に価値観を押し付けるようなレビューやコメントは控えてください。</p>
                <b>他人の楽しみを奪わないようにしましょう。</b>
                <p>謎解きにおいてネタバレは厳禁です。</p>
                <p>予期せぬネタバレを防ぐため、ネタバレが含まれるレビューには必ず「ネタバレ」のチェックを入れてください。</p>
                <p>コメントについても同様です。</p>
                <b>必要な措置について</b>
                <p>本ガイドラインは<Link to="/kiyaku" className={classes.link}>利用規約</Link>と異なり、違反の確認次第必ず措置をとるものではありません。</p>
                <p>ただし、本ガイドラインに違反した場合、当該コンテンツの非表示、削除などの措置をとる場合があります。</p>
                <p>2021年5月25日制定</p>
            </Box>
            <Footer />
        </>
    )
}
