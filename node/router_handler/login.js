/**
 * 在这里定义和用户相关的路由处理函数，供 /router/login.js 模块进行调用
 */

//导入数据库操作模块：
const db = require('../db/index')

//导入密码加密模块
const bcrypt = require('bcryptjs')

// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')

// 注册用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body

    //定义查询SQL语句
    const sql = `select * from user where username=?`
    db.query(sql, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err.message)
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // TODO: 用户名可用，继续后续流程

        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        //定义插入用户的 SQL 语句：
        const sql = 'insert into user set ?'

        db.query(sql, { username: userinfo.username, password: userinfo.password, role: userinfo.role }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(err.message)
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册成功
            res.cc('注册成功！', 0)
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = `select * from user where username=?`
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('账号不存在!')
        // TODO：判断用户输入的登录密码是否和数据库中的密码一致

        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码错误!')
        }
        if(userinfo.role != results[0].role){
            return res.cc('你没有此权限!')
        }
        // TODO：登录成功，生成 Token 字符串

        //快速剔除 密码
        const user = { ...results[0], password: ''}
        // 导入配置文件
        const config = require('../config')

        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn // token 有效期
        })

        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
          })

    })
}