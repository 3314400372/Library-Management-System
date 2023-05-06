const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入用户路由处理函数模块
const adminHandler = require('../router_handler/admin')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const {rdelete_schema ,reg_login_schema,reg_reader_schema,modifyBook_schema,addBook_schema} = require('../schema/admin')


//读者信息查询
router.post('/selectAllreader',expressJoi(reg_reader_schema), adminHandler.selectAllreader)

//读者信息修改
router.post('/Readerinformation',expressJoi(reg_login_schema),adminHandler.Readerinformation)

//读者删除
router.post('/deleteuser',expressJoi(rdelete_schema),adminHandler.deleteuser)

//查看借出图书
router.post('/selectAlllendBook',expressJoi(reg_reader_schema),adminHandler.selectAlllendBook)

//图书催还
router.post('/bookrecall',expressJoi(rdelete_schema),adminHandler.bookrecall)

//所有借阅记录
router.post('/Allborrowingrecords', expressJoi(reg_reader_schema), adminHandler.Allborrowingrecords)

//修改图书信息
router.post('/modifyBook', expressJoi(modifyBook_schema), adminHandler.modifyBook)

//删除图书
router.post('/delectBook', expressJoi(rdelete_schema), adminHandler.delectBook)

//数据借出排行
router.get('/Lendingranking', adminHandler.Lendingranking)

//添加图书
router.post('/addBook', expressJoi(addBook_schema), adminHandler.addBook)

// 将路由对象共享出去
module.exports = router
