const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入用户路由处理函数模块
const readrsHandler = require('../router_handler/readers')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_reader_schema,paginationSchema,returnbook_schema} = require('../schema/readers')

// 查询所有图书的路由
router.post('/selectallbook', expressJoi(reg_reader_schema), readrsHandler.queryAllBook)

//借阅图书
router.post('/BorrowingBook', expressJoi(paginationSchema), readrsHandler.JoinBorrowing)

//查询个人已经借阅图书
router.post('/BookRturnSellct',expressJoi(reg_reader_schema), readrsHandler.BookRturnSellct)

//图书归还
router.post('/returnbook', expressJoi(returnbook_schema), readrsHandler.Returnbook)

//我的借阅记录
router.post('/Myborrowingrecords', expressJoi(reg_reader_schema), readrsHandler.Myborrowingrecords)

// 将路由对象共享出去
module.exports = router
