// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 导入 cors 中间件
const cors = require('cors')
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 将 cors 注册为全局中间件
app.use(cors())

//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))


// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})


// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))


// 导入并注册用户路由模块
const userRouter = require('./router/login')
app.use('/api', userRouter)

// 导入并注册读者路由模块
const readersRouter = require('./router/readers')
app.use('/readers', readersRouter)

// 导入并注册橄榄油路由模块
const adminRouter = require('./router/admin')
app.use('/admin', adminRouter)

const joi = require('@hapi/joi')

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})


// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
  console.log('api server running at http://127.0.0.1:8888')
})
