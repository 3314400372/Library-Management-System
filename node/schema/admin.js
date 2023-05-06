// 信息验证规则模块
const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */



// 定义Id 的校验规则
const id = joi.number().integer().min(1).required()

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(12).required()

// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{3,12}$/)
  .required()

// 当前页的验证规则
const currentPage = joi.number()
  .integer()
  .min(1)
  .required()

// 显示页的验证规则
const size = joi.number()
  .integer()
  .min(1)
  .required()

// id验证
exports.rdelete_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    id
  },
}
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
    id
  },
}

// 分页查询的验证规则对象
exports.reg_reader_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    currentPage,
    size
  },
}

//修改图书验证规则
exports.modifyBook_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
   id,
   bookname: joi.string().required(),
   author: joi.string().required(),
   introduce: joi.string().required(),
   price: joi.number().precision(2).min(0.01).required(),
   inventory: joi.number().integer().min(1).required()
  },
}

//添加图书验证规则
exports.addBook_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
   bookname: joi.string().required(),
   author: joi.string().required(),
   introduce: joi.string().required(),
   price: joi.number().precision(2).min(0.01).required(),
   inventory: joi.number().integer().min(1).required()
  },
}