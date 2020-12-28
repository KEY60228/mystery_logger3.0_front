// ファイルシステムモジュールの読み込み
const fs = require('fs')
// webpack-merge
const { merge } = require('webpack-merge')
// 共通設定
const common = require('./webpack.common')

module.exports = merge(common, {
    // @ts-ignore
    // 開発モード
    mode: 'production',
})
