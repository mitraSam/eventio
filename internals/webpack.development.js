const webpack = require('webpack');
module.exports = {
    devtool: 'cheap-eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader', // compiles Sass to CSS, using Node Sass by default
                ],
            },
        ],
    },
    /* enable hot reload*/
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './js/components/ClientApp.jsx',
    ],
    devServer: {
        publicPath: '/public/',
        historyApiFallback: true,
        hot: true,
    },

    plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
};
