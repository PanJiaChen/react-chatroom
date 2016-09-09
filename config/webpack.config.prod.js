var path = require('path');
var fs = require('fs');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var url = require('url');
var paths = require('./paths');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();
var vendor = 'wscn-react-vendor.min.js';
// var homepagePath = require(paths.appPackageJson).homepage;
// var publicPath = homepagePath ? url.parse(homepagePath).pathname : '/';
var publicPath = '/';
if (!publicPath.endsWith('/')) {
    // Prevents incorrect paths in file-loader
    publicPath += '/';
}
const outputFileName = 'react-market.min.js';
module.exports = {
    entry: [
        path.join(paths.appSrc, 'entry')
    ],
    output: {
        path: paths.appBuild,
        filename: 'static/js/' + outputFileName,
        publicPath: publicPath,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        alias: {
            // This `alias` section can be safely removed after ejection.
            // We do this because `babel-runtime` may be inside `react-scripts`,
            // so when `babel-plugin-transform-runtime` imports it, it will not be
            // available to the app directly. This is a temporary solution that lets
            // us ship support for generators. However it is far from ideal, and
            // if we don't have a good solution, we should just make `babel-runtime`
            // a dependency in generated projects.
            // See https://github.com/facebookincubator/create-react-app/issues/255
            'babel-runtime/regenerator': require.resolve('babel-runtime/regenerator'),
            'config': paths.appConfig + (process.env.NODE_ENV || "development") + '.js',
        }
    },
    externals: {
        'react': {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
        },
        'react-addons-css-transition-group': {
            root: ['React', 'addons', 'CSSTransitionGroup'],
            commonjs: 'react-addons-css-transition-group',
            commonjs2: 'react-addons-css-transition-group',
            amd: 'react-addons-css-transition-group'
        },
        'axios': 'axios'
    },
    resolveLoader: {
        root: paths.ownNodeModules,
        moduleTemplates: ['*-loader']
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: paths.appSrc
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                include: paths.appSrc,
                loader: 'babel',
                query: require('./babel.prod')
            },
            {
                test: /\.scss|\.css$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
            },
            {
                test: /\.json$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: 'json'
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: 'file',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(mp4|webm)(\?.*)?$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    eslint: {
        // TODO: consider separate config for production,
        // e.g. to enable no-console and no-debugger only in prod.
        configFile: path.join(__dirname, 'eslint.js'),
        useEslintrc: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            favicon: paths.appFavicon,
            vendor_dll: vendor,
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
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true,
                except: ['$super', '$', 'exports', 'require']
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new DashboardPlugin(dashboard.setData),
        new ExtractTextPlugin('static/css/[name].css')
    ]
};
