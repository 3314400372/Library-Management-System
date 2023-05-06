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

// 定义Id 的校验规则
const id = joi.number().integer().min(1).required()


// 定义验证规则
const timeSchema = joi.string().required().regex(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/).required();
// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(12).required()
// 书名的验证规则
const bookname = joi.string().min(1).max(20).required()



// 分页查询的验证规则对象
exports.reg_reader_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        currentPage,
        size
    },
}
//验证时间
exports.paginationSchema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      time: timeSchema,
      username,
      bookname
    },
  };

  // id验证
exports.returnbook_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        id,
        bookname,
        username,
        time: timeSchema,
        returntime: timeSchema,
    },
}
