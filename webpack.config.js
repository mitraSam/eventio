const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const dotenv = require('dotenv');

const modeConfig = env => require(`./internals/webpack.${env.mode}.js`);

module.exports = ({mode} = {mode: 'production'}) => {
    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return merge(
        {
            context: __dirname,

            output: {
                path: path.join(__dirname, 'public'),
                filename: 'bundle.js',
                publicPath: '/public/',
            },

            resolve: {
                extensions: ['.js', '.jsx', '.json', '.scss'],
                alias: {
                    styles: path.resolve(__dirname, 'assets/styles/'),
                },
            },
            stats: {
                colors: true,
                reasons: true,
                chunks: true,
            },
            module: {
                rules: [
                    {
                        enforce: 'pre',
                        test: /\.jsx?$/,
                        loader: 'eslint-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                    },
                    {
                        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    outputPath: 'fonts/',
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(png|jpg|gif)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {},
                            },
                        ],
                    },
                ],
            },

            plugins: [new webpack.DefinePlugin(envKeys)],
        },
        modeConfig({mode})
    );
};
