module.exports = {
    babelrc: false,
    cacheDirectory: true,
    presets: [
        'babel-preset-es2015',
        'babel-preset-es2016',
        'babel-preset-react'
    ],
    plugins: [
        'babel-plugin-syntax-trailing-function-commas',
        'transform-decorators-legacy',
        'babel-plugin-transform-class-properties',
        'babel-plugin-transform-object-rest-spread'
    ]
};
