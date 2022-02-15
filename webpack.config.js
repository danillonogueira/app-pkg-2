const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  devServer: {
    port: 8002,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            [
              '@babel/preset-react', 
              { runtime: 'automatic' }
            ],
          ],
        },
      },
      {
        test: /\.css|.sass|.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(
      {
        name: 'app_pkg_2',
        filename: 'remoteEntry.js',
        exposes: {
          './Button': './src/components/Button.js',
        },
      }
    ),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
