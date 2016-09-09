var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
/*to alleviate conflict with osx path*/
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var paths = require('./paths');

module.exports = {
    devtool: 'eval',
    cache: true,
    entry: [
        require.resolve('webpack-dev-server/client') + '?/',
        require.resolve('webpack/hot/only-dev-server'),
        require.resolve('./polyfills'),
        path.join(paths.appSrc, 'entry')
    ],
    output: {
        // Next line is not used in dev but WebpackDevServer crashes without it:
        path: paths.appDev,
        pathinfo: true,
        filename: 'static/js/bundle.js',
        publicPath: '/'
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
            'config': paths.appConfig  + (process.env.NODE_ENV || "development") + '.js',
        }
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
                include: paths.appSrc,
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot'],
                include: [paths.appSrc],
            },
            {
                test: /\.js$/,
                include: paths.appSrc,
                loader: 'babel',
                query: require('./babel.dev')
            },
            {
                test: /\.scss/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: 'style!css'
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
                    name: 'static/media/[name].[ext]'
                }
            },
            {
                test: /\.(mp4|webm)(\?.*)?$/,
                include: [paths.appSrc, paths.appNodeModules],
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[ext]'
                }
            }
        ]
    },
    eslint: {
        configFile: path.join(__dirname, 'eslint.js'),
        useEslintrc: false
    },
    /* most developer is chrome if you need you can add*/
    // postcss: function () {
    //     return [autoprefixer];
    // },
    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(paths.manifestSrc + '/vendor-manifest-dev.json'),
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            favicon: paths.appFavicon,
            vendor_dll:"vendor_dll.js",
            hash: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
    ]
};
