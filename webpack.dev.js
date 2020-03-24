'use strict'

const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugin = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1]
        entry[pageName] =  entryFile
        htmlWebpackPlugin.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks:[pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                }
            })
        )
        
    })
    return { entry, htmlWebpackPlugin }
}

const { entry, htmlWebpackPlugin} = setMPA()

module.exports = {
    entry: entry,
    output: {
        path: path .join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
            {
                test: /\.css$'/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                // use: 'file-loader',
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /\.(woff|otf|woff2|eot|ttf)$/,
                use: 'file-loader',
            }
        ]
    },
    // 热更新
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugin),
    devServer: {
        contentBase: './dist',
        hot: true
    },
    // devtool: 'source-map',
    // devtool: 'inline-source-map',
    devtool: 'cheap-source-map',



}