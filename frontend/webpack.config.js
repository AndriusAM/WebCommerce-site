const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve:
  {
    fallback: {
      fs: false,
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify') 
    }, 
  },
  entry: {
    main: path.resolve(__dirname, 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/frontendBundle'),
    filename: 'index.js',
    clean: true
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      watch: true
    },
    port: 5001,
    open: true,
    hot: true,
  },
  // loaders
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader'
        ] 
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        use: {
          loader: 'url-loader',
        },      
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
      
    ]
  }, 
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Amazona page demo',
      filename: 'index.html',
      template: path.resolve(__dirname, 'temp.html')
    }),
    new NodePolyfillPlugin()
  ],
  optimization: {
    minimizer: [],
  },
  stats: { errorDetails: true },
};