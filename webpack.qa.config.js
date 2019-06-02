const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcRoot = path.resolve(__dirname, 'src');

module.exports = {
    ...webpackConfig('qa'),
    plugins: [
        new CleanWebpackPlugin(['build']),
        new CopyWebpackPlugin([
            {from: './src/index.html'},
            {from: './src/assets', to: './assets'},
        ]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/, /lodash$/),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(srcRoot, 'index.html'),
            chunksSortMode: 'dependency',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor','react','main','admin'],
            filename:'[name].[chunkhash].js',
            minChunks: Infinity,
        }),
        new webpack.DefinePlugin({
            'global.GENTLY': false,
            process: { env: { NODE_ENV: '"qa"' } }
        }),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ]
};