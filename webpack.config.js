require('dotenv').config();

const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        _jsxCompile: path.join(__dirname, 'src_client/js/client'),
        _styleCompile: path.join(__dirname, 'src_client/css/style'),
        _materialCompile: path.join(__dirname, 'src_client/css/materialize/sass/materialize')
    },
    output: {
        path: path.join(__dirname, 'src_client/compile'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.sass', '.scss', '.css', '.woff', '.woff2']
    },
    // devServer: {
    //     historyApiFallback: true  
    // },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s(c|a)ss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=200000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                exclude: /node_modules/,
                loader: 'file-loader?limit=200000' 
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                APP_URL: JSON.stringify(process.env.APP_URL),
                MONGO_URI: JSON.stringify(process.env.MONGO_URI),
                JWT_HASH: JSON.stringify(process.env.JWT_HASH),
                GOOGLE_KEY: JSON.stringify(process.env.GOOGLE_KEY),
                PORT: JSON.stringify(process.env.PORT)
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ]
};