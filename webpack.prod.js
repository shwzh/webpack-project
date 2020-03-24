'use strict'

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

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
                chunks:['vendors',pageName],
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
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
            {
                test: /\.css$'/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => {
                                require('autoprefixer')({
                                    browsers: ['last2 version', '>1%', 'ios 7']
                                })
                            }
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                // use: 'file-loader',
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|otf|woff2|eot|ttf)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        // react 单独打包出去 不在打包到js里面
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
        //             global: 'React',
        //         },{
        //             module: 'react-dom',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
        //             global: 'ReactDom',
        //         }
                
        //     ]
        // })

    ].concat(htmlWebpackPlugin),
    optimization: {
        splitChunks: {
            minSize: 0,  //引用模块文件的大小
            cacheGroups: {
                commons: {
                    // test: /(react|react-dom)/, // 中间不能有空格
                    // name: 'vendors',
                    name: 'commons',  //文件名字
                    chunks: 'all',
                    minChunks: 2  // 至少被引用的次数 才会被单独打包
                }
            }
        }
    }
}