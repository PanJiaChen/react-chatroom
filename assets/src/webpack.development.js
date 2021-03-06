var webpack = require('webpack')
var path = require('path')
var node_modules = path.resolve(__dirname, '../../../../../../../node_modules');
function getDevelopWebpack(){
    return {
        //entry: "./client/Index.jsx",
        entry: {
            'lib':[
                path.join(__dirname,'lib/lib.js')
            ]
        },
        output: {
            filename: "[name].js",
            chunkFilename:'[name].js',
            path:  "/static/dist",
            libraryTarget:'umd',
            sourceMapFilename:'[name].map',
            //library:'libName',
            publicPath:'http://localhost:9528/'//webpack-dev-server 文件是在内存里的，使用时，在硬盘上看不到生成的文件。这个路径是静态文件的basePath
        },
        // externals:{
        //     'react': {
        //         root: 'React',
        //         commonjs2: 'react',
        //         commonjs: 'react',
        //         amd: 'react'
        //     },
        //     'react-dom':{
        //         root:'ReactDOM',
        //         commonjs2: 'react-dom',
        //         commonjs: 'react-dom',
        //         amd:'react-dom'
        //     }
        // },
        resolve:{
            alias:{
                'react':path.join(node_modules,'./react'),
                'react-dom':path.join(node_modules,'./react-dom'),
                'jquery':path.join(node_modules,'./jquery/dist/jquery.min.js'),
                'react-addons-transition-group':path.join(node_modules,'./react/lib/ReactTransitionGroup.js'),      
            }
        },
        module: {
            loaders: [
                {
                    test: /[\.jsx|\.js ]$/,
                    exclude: /node_modules/,
                    loaders: ["babel-loader?stage=0&optional[]=runtime"]
                },
                { test: /\.css$/, loader: "style!css" },
                {
                    test: /\.less$/,
                    loader: "style-loader!css-loader!less-loader"
                },

                { test: /\.(png|jpg|gif)$/, loader: 'url-loader?name=mobile/' }

            ]
        },
        debug:true,
        // devtool:'source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.SourceMapDevToolPlugin(
                '[file].map', null,
                "[absolute-resource-path]", "[absolute-resource-path]")
            //new webpack.OldWatchingPlugin()//新版的不知道为啥不watch，用这个可以临时解决。
        ]
    }
}

module.exports = getDevelopWebpack