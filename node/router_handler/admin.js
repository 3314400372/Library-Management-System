//导入数据库操作模块：
const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')

//导入密码加密模块
const bcrypt = require('bcryptjs')

//读者信息查询
exports.selectAllreader = (req, res) => {
    if(req.user.role !== 1){
        return res.cc("你不是管理员，无此权限!")
    }
    const userinfo = req.user
    //定义查询总数sql
    let sql1 = `SELECT COUNT(*) AS total FROM user  WHERE role=2 `
    db.query(sql1,(err, result) => {
        if (err) return res.cc(err)
        const total = result[0].total

        const sql = `SELECT id,username FROM user WHERE role=2 LIMIT ?, ?`
        db.query(sql,[(req.body.currentPage - 1) * req.body.size, req.body.size],(err, result) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '读者信息查询成功！',
                data: result,
                total:total
            })
        })
    })
}

//查看借出图书
exports.selectAlllendBook = (req, res) => {
    if(req.user.role !== 1){
        return res.cc("你不是管理员，无此权限!")
    }
    const userinfo = req.user
    //定义查询总数sql
    let sql1 = `SELECT COUNT(*) AS total FROM borrowing `
    db.query(sql1,(err, result) => {
        if (err) return res.cc(err)
        const total = result[0].total

        const sql = `SELECT * from borrowing LIMIT ?, ?`
        db.query(sql,[(req.body.currentPage - 1) * req.body.size, req.body.size],(err, result) => {
            if (err) return res.cc(err.message)
            if (result.length === 0) {
                res.send({
                    status: 0,
                    message: "没有借出的图书!",
                    data: result
                })
            } else {
                res.send({
                    status: 0,
                    message: '获取借阅记录成功!',
                    data: result,
                    total:total
                })
            }
        })
    })
}

//图书催还
exports.bookrecall = (req, res) => {
    if(req.user.role !== 1){
        return res.cc("你不是管理员，无此权限!")
    }
    const sql = `UPDATE borrowing set urgerepayment=0  WHERE id=?`
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err.message)
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('催还失败！')

        res.cc('催还成功！', 0)
    })
}

//读者信息修改
exports.Readerinformation= (req, res) => {
    if(req.user.role !== 1){
        return res.cc("你不是管理员，无此权限!")
    }
    const userinfo = req.body

    //定义查询SQL语句
    const sql = `select * from user where id=?`
    db.query(sql, [userinfo.id], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err.message)
        }
        if (results.length !== 1) {
            return res.cc('用户不存在!')
        }
        // TODO: 用户存在，继续后续流程

        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        //定义插入用户的 SQL 语句：
        const sql = 'UPDATE user SET username=?, password=? WHERE id=?;'
         console.log(userinfo);
        db.query(sql, [userinfo.username, userinfo.password,userinfo.id], function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(err.message)
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.cc('修改信息失败，请稍后再试！')
            }
            // 注册成功
            res.cc('修改成功！', 0)
        })
    })
}

//读者删除
exports.deleteuser =(req,res)=>{
    if(req.user.role !== 1){
        return res.cc("你不是管理员，无此权限!")
    }
    const sql =`DELETE  from user WHERE id=?`
    db.query(sql,req.body.id,(err,results)=>{
        if (err) return res.cc(err.message)
        if (results.affectedRows !== 1) return res.cc('用户删除失败！')

        res.cc('删除成功!', 0)
    })
}

//查询所有借阅记录
exports.Allborrowingrecords =(req,res)=>{
    if(req.user.role !== 1){
        return res.cc("你不是管理员，无此权限!")
    }
    const userinfo = req.body
    //定义查询总数sql
    let sql1 = `SELECT COUNT(*) AS total FROM borrowinghistory`
    db.query(sql1,(err, result) => {
        if (err) return res.cc(err)
        const total = result[0].total

        //定义分页查询sql
        let sql2 = 'SELECT * FROM borrowinghistory  LIMIT ?, ?'

        db.query(sql2, [(userinfo.currentPage - 1) * userinfo.size, userinfo.size], (err, result) => {
            if (err) return res.cc(err)

            if (result.length === 0) {
                res.send({
                    status: 0,
                    message: "没有借阅记录！",
                    data: result
                })
            } else {
                res.send({
                    status: 0,
                    message: "借阅记录查询成功！",
                    data: {
                        result,
                        total: total
                    }
                })
            }
        })
    })
}

//修改图书
exports.modifyBook =(req,res)=>{
    if(req.user.role !== 1){
        return res.cc("你不是管理员，无此权限!")
    }
    const userinfo = req.body
    const sql=`UPDATE book SET ? WHERE id =?`
    db.query(sql,[userinfo,userinfo.id],(err,results)=>{
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "修改图书成功!",
        })
    })
}

//删除图书
exports.delectBook =(req,res)=>{
    if(req.user.role !== 1){
        return res.cc("你不是管理员，无此权限!")
    }
    const userinfo = req.body
    const sql=`DELETE  from book WHERE id = ?`
    db.query(sql,[userinfo.id],(err,results)=>{
        if (err) return res.cc(err)
        if (results.affectedRows == 0) return res.cc('书籍不存在！')
        res.send({
            status: 0,
            message: "删除图书成功!",
        })
    })
}

//书籍借出排行
exports.Lendingranking =(req,res)=>{
    if(req.user.role !== 1){
        return res.cc("你不是管理员，无此权限!")
    }
    const sql=`SELECT bookname, COUNT(*) AS count FROM borrowinghistory GROUP BY bookname ORDER BY count DESC`
    db.query(sql,(err,results)=>{
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "书籍借出排行查询成功!",
            data:results
        })
    })
}

//添加图书
exports.addBook =(req,res)=>{
    if(req.user.role !== 1){
        return res.cc("你不是管理员，无此权限!")
    }
    const userinfo = req.body
    const sql =`INSERT INTO book(bookname, author, introduce, price, inventory) VALUES (?,?,?,?,?)`
    db.query(sql,[userinfo.bookname,userinfo.author,userinfo.introduce,userinfo.price,userinfo.inventory],(err,results)=>{
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "添加成功!",
        })
    })
}