import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import { Footer } from '../../reusable/Footer'
import { footerHeight, headerHeight } from '../../util'

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            margin: '8px 8px 40px',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - 48px)`,
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        }
    })
)

export const PolicyTemplate: FC = () => {
    const classes = useStyles()

    return (
        <>
            <Box className={classes.root}>
                <h3>プライバシーポリシー</h3>
                <b>お客様から取得する情報</b>
                <p>運営者は、お客様から以下の情報を取得します。</p>
                <ul>
                    <li>氏名(ニックネームやペンネームも含む)</li>
                    <li>メールアドレス</li>
                    <li>写真や動画</li>
                    <li>外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報</li>
                    <li>Cookie(クッキー)を用いて生成された識別情報</li>
                    <li>運営者ウェブサイトの滞在時間、入力履歴、購買履歴等の運営者ウェブサイトにおけるお客様の行動履歴</li>
                    <li>お客様の位置情報</li>
                </ul>
                <b>お客様の情報を利用する目的</b>
                <p>運営者は、お客様から取得した情報を、以下の目的のために利用します。</p>
                <ul>
                    <li>運営者サービスに関する登録の受付、お客様の本人確認、認証のため</li>
                    <li>お客様の運営者サービスの利用履歴を管理するため</li>
                    <li>運営者サービスにおけるお客様の行動履歴を分析し、運営者サービスの維持改善に役立てるため</li>
                    <li>市場分析、マーケティングのため</li>
                    <li>広告の配信、表示及び効果測定のため</li>
                    <li>お客様からのお問い合わせに対応するため</li>
                    <li>運営者の規約や法令に違反する行為に対応するため</li>
                    <li>運営者サービスの変更、提供中止、終了、契約解除をご連絡するため</li>
                    <li>運営者規約の変更等を通知するため</li>
                    <li>以上の他、運営者サービスの提供、維持、保護及び改善のため</li>
                </ul>
                <b>第三者提供</b>
                <p>運営者は、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。</p>
                <p>但し、次の場合は除きます。</p>
                <ul>
                    <li>個人データの取扱いを外部に委託する場合</li>
                    <li>運営者や運営者サービスが買収された場合</li>
                    <li>事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）</li>
                    <li>その他、法律によって合法的に第三者提供が許されている場合</li>
                </ul>
                <b>アクセス解析ツール</b>
                <p>運営者は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" className={classes.link}>こちら</a>からご確認ください。</p>
                <b>広告の配信</b>
                <p>運営者は、Google及びそのパートナー（第三者配信事業者）の提供する広告を設置しています。広告配信にはCookieを使用し、お客様が過去に運営者ウェブサイトやその他のサイトにアクセスした情報に基づいて広告を配信します。Google やそのパートナーは、Cookieを使用することにより適切な広告を表示しています。</p>
                <p>お客様は、<a href="https://adssettings.google.com/u/0/authenticated" className={classes.link}>こちら</a>のGoogleアカウントの広告設定ページから、パーソナライズ広告を無効にできます。</p>
                <p>また aboutads.info のページにアクセスし、パーソナライズ広告掲載に使用される第三者配信事業者のCookieを無効にすることもできます。</p>
                <p>その他、GoogleによるCookieの取り扱い詳細については、<a href="https://policies.google.com/technologies/ads" className={classes.link}>こちら</a>のGoogleのポリシーと規約のページをご覧ください。</p>
                <b>プライバシーポリシーの変更</b>
                <p>運営者は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。</p>
                <b>お問い合わせ</b>
                <p>お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。</p>
                <p>メールアドレス: mystery.logger.com@gmail.com</p>
                <p>この場合、必ず、運転免許証のご提示等運営者が指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。</p>
                <p>2021年05月25日 制定</p>
            </Box>
            <Footer />
        </>
    )
}
