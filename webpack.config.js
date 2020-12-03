// pathモジュールの読み込み
const path = require('path')
const fs = require('fs')
const Dotenv = require('dotenv-webpack')

module.exports = {
    // モードを開発モードにする
    mode: 'development',
    // 入力ファイル設定
    entry: [path.resolve(__dirname, './src/index.tsx')],
    // 出力ファイル設定
    output: {
        // 出力されるファイル名
        filename: 'bundle.js',
        // 出力先ディレクトリ
        path: path.resolve(__dirname, './dist'),
    },

    // モジュール設定
    module: {
        rules: [
            {
                // ts-loaderの設定
                test: /\.(js|ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    // モジュール解決
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

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

    // dotenv設定
    plugins: [
        new Dotenv({path: './.env'})
    ]
}
