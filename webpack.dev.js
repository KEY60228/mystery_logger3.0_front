// ファイルシステムモジュールの読み込み
const fs = require('fs')
// webpack-merge
const { merge } = require('webpack-merge')
// 共通設定
const common = require('./webpack.common')

module.exports = merge(common, {
    // @ts-ignore
    // 開発モード
    mode: 'development',
    // 開発モード設定
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        https: {
            key: fs.readFileSync('./ssl/server.key'),
            cert: fs.readFileSync('./ssl/server.crt'),
        },
    },
})
