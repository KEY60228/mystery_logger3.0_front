// Dotenvモジュールの読み込み
const Dotenv = require('dotenv-webpack')
// minifization module
const TerserPlugin = require('terser-webpack-plugin')
// webpack-merge
const { merge } = require('webpack-merge')
// 共通設定
const common = require('./webpack.common')

module.exports = merge(common, {
    // @ts-ignore
    // 開発モード
    mode: 'production',
    // minifization
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                output: {
                    comments: false,
                }
            }
        })],
    },
    // dotenv設定
    plugins: [
        new Dotenv({path: './.env.prod'})
    ],
})
