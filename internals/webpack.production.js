const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const MiniCssPlugin = new MiniCssExtractPlugin({
  filename: "styles.css"
});

const OptimizeCSSPlugin = new OptimizeCSSAssetsPlugin({
  cssProcessor: cssnano,
  cssProcessorOptions: {
    discardComments: {
      removeAll: true
    },
    // Run cssnano in safe mode to avoid
    // potentially unsafe transformations.
    safe: true
  },
  canPrint: false
});

module.exports = {
  entry: "./js/components/ClientApp.jsx",
  mode: "production",

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    MiniCssPlugin,
    OptimizeCSSPlugin,
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};
