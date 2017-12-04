// // webpack.config.js for Babel 5
// var path = require('path');
// var webpack = require('webpack');
// module.exports = {
//     entry: './main.js',
//     output: { path: __dirname + '/public/js', filename: 'react-app.js' },
//     module: {
//         loaders: [
//             { test: /.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
//         ]
//     },
// };

// webpack.config.js for Babel 6
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public/js',
        filename: 'react-app.js'
    },
    module: {
        loaders: [
        {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: { 
                presets: ['react', 'es2015'],
                plugins: [
                ]
            }
        }]
    },
};