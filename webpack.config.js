const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  // entry: './src/index.js',
  entry: {
    app: './src/index.js',
    // another: './src/another-module.js'
    // print: './src/grint.js'
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist',
    // 模块热更新
    hot: true
  },

  plugins:[
    // 清理dist目录
    new CleanWebpackPlugin(['dist']),
    // HtmlWebpackPlugin 创建了一个全新的文件，
    // 所有的 bundle 会自动添加到 html 中。
    new HtmlWebpackPlugin({
      title: 'webpack 代码分离' //新html文件的title标签
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // 指定公共 bundle 的名称。
    // }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js',
    publicPath: './' // 网站访问的根目录
  },
  module: {
  	rules: [
  		{
  			test: /\.css$/,
  			use: [
  				'style-loader',
  				'css-loader'
  			]
  			// 在这种情况下，以 .css 结尾的全部文件，
  			// 都将被提供给 style-loader 和 css-loader。
  			// 在依赖于此样式的文件中 import './style.css'
        // 当该模块运行时，含有 CSS 字符串的 <style> 标签，
        // 将被插入到 html 文件的 <head> 中
  		},
      {
        test:/\.(png|svg|jpg|gif)$/,
        use:[
          'file-loader'
        ]
      },
      // 加载图片,该图像将被处理并添加到 output 目录
      // 依赖此图片的js文件中通过 import imgSrc from './img.png'
      // 变量 imgSrc 就是处理后的最终 url 
      // CSS 中的 url('./my-image.png') 会使用类似的过程去处理
      // html-loader 以相同的方式处理 <img src="./my-image.png" />
      {
        // 处理字体文件
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use:[
          'file-loader'
        ]
      }
  	]
  }
};