var path = require('path');
var fs = require('fs');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var url = require('url');
var paths = require('./paths');

const outputFileName = 'react-market.min.js';
module.exports = {
    entry: [
        path.join(paths.appSrc, 'entry')
    ],
    output: {
        path: paths.appDist,
        filename: 'js/' + outputFileName,
        publicPath: '/',
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
    eslint: {
        // TODO: consider separate config for production,
        // e.g. to enable no-console and no-debugger only in prod.
        configFile: path.join(__dirname, 'eslint.js'),
        useEslintrc: false
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
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
        new ExtractTextPlugin('css/[name].css')
    ]
};
