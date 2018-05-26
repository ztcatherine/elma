'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()//请求server
// mock data start
// 1. 加载json数据
const apiData = require('../src/mock/data.json') // 自动将json对象转换为js对象
// 2. 创建路由器
const apiRouter = express.Router()
// 3. 映射路由

// 4. 启用路由器
app.use(apiRouter)   // /api/xxx
// mock data end
/*var appData = require('../src/mock/data.json')//加载本地数据文件
var apiRoutes = express.Router()*/
/*app.use(apiRoutes)//通过路由请求数据*/
/*var jsonParser = bodyParser.json()
// 解析post请求 请求体
var urlencodedParser = bodyParser.urlencoded({ extended: true })*/
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(apiRouter) {
      apiRouter.get('/goods', function (req, res, next) {
        res.json({
          code: 0, //0代表正确数据
          data: apiData.goods
        })
      })
      apiRouter.get('/ratings', function (req, res, next) {
        res.json({
          code: 0, //0代表正确数据
          data: apiData.ratings
        })
      })
      apiRouter.get('/seller', function (req, res, next) {
        res.json({
          code: 0, //0代表正确数据
          data: apiData.seller
        })
      })
     }
     },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': require('../config/dev.env')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsSubDirectory,
          ignore: ['.*']
        }
      ])
    ]
  }
)

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
