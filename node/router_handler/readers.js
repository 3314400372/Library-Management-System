/**
 * 在这里定义和读者相关的路由处理函数，供 /router/readers.js 模块进行调用
 */

//导入数据库操作模块：
const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')

// 查询所有图书的处理函数
exports.queryAllBook = (req, res) => {
    //定义查询总数sql
    let sql1 = `SELECT COUNT(*) AS total FROM book;`
    db.query(sql1, (err, result) => {
        if (err) return res.cc(err)
        const total = result[0].total

        //定义分页查询sql
        let sql2 = 'SELECT * FROM book LIMIT ?, ?'

        db.query(sql2, [(req.body.currentPage - 1) * req.body.size, req.body.size], (err, result) => {
            if (err) return res.cc(err)

            if (result.length === 0) {
                res.send({
                    status: 1,
                    message: "图书馆还没有上书！",
                    data: result
                })
            } else {
                res.send({
                    status: 0,
                    message: "查询图书成功！",
                    data: {
                        result,
                        total: total
                    }
                })
            }
        })
    })
}

//借阅图书方法
exports.JoinBorrowing = (req, res) => {
    //todo:判断用户是否存在
    const userinfo = req.body
    //定义查询SQL语句
    const sql = `select * from user where username=?`
    db.query(sql, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err.message)
        }
        // 用户名不存在
        if (results.length <= 0) {
            return res.cc('用户不存在,无法借阅书！')
        }
        //todo:判断书是否存在
        const sql = `select * from book where bookname=?`
        db.query(sql, [userinfo.bookname], function (err, results) {
            // 执行 SQL 语句失败
            if (err) {
                return res.cc(err.message)
            }
            // 书籍不存在
            if (results.length <= 0) {
                return res.cc('书籍不存在,无法借阅书！')
            }
            //todo:查看书籍库存是否大于1
            const sql = `SELECT inventory from book WHERE bookname =?`
            db.query(sql, [userinfo.bookname], function (err, results) {
                // 执行 SQL 语句失败
                if (err) {
                    return res.cc(err.message)
                }
                // 书籍不存在
                if (results.length < 1) {
                    return res.cc('库存不足,无法借阅书！')
                }
            })


            //todo:用户书籍都存在，进行借阅
            // 执行事务
            db.getConnection((err, connection) => {
                // 开始事务
                connection.beginTransaction((err) => {
                    if (err)  return res.cc(err.message);

                    // 事务中的 SQL 操作语句
                    const borrowSql = `INSERT INTO borrowing(bookname,time,username) VALUES(?,?,?)`
                    const updateSql = `UPDATE book SET inventory = inventory - 1 WHERE bookname = ?`
                    // console.log(userinfo);
                    // 事务中的第 1 个 SQL 操作
                    connection.query(borrowSql,[userinfo.bookname,userinfo.time,userinfo.username],(err, results, fields) => {
                        if (err) {
                            // 如果执行失败则回滚
                            return connection.rollback(() => {
                                //  res.cc(err.message);
                                 res.cc("加入借阅数据库失败！");
                            });
                        }

                        // 事务中的第 2 个 SQL 操作
                        connection.query(updateSql,userinfo.bookname,(err, results, fields) => {
                            if (err) {
                                // 如果执行失败则回滚
                                return connection.rollback(() => {
                                     res.cc(err.message)
                                     res.cc("库存跟新失败!");
                                });
                            }

                            // 事务提交
                            connection.commit((err) => {
                                if (err) {
                                    // 如果提交失败则回滚
                                    return connection.rollback(() => {
                                         res.cc(err.message)
                                    });
                                }
                                res.send({
                                    status:0,
                                    message:'借阅成功！'
                                })
                            });
                        });
                    });

                    // 释放连接
                    connection.release();
                });
            });

        })

    })

}

//查询个人已经借阅图书
exports.BookRturnSellct = (req,res)=>{
    const userinfo = req.user
    //定义查询总数sql
    let sql1 = `SELECT COUNT(*) AS total FROM borrowing where username = ? `
    db.query(sql1, req.user.username,(err, result) => {
        if (err) return res.cc(err)
        const total = result[0].total

        const sql2 =`SELECT * from borrowing WHERE username = ? LIMIT ?, ?`
        db.query(sql2,[userinfo.username,(req.body.currentPage - 1) * req.body.size, req.body.size],(err,result)=>{
            if(err) return res.cc(err.message)
            if (result.length === 0) {
                res.send({
                    status: 0,
                    message: "你没有正在借阅的图书!",
                    data: result
                })
            } else {
              res.send({
                status:0,
                message:'获取借阅记录成功!',
                data:result,
                total:total
              })
            }
        })
    })
}

//图书归还
exports.Returnbook =(req,res)=>{
    const userinfo =req.body
    console.log(userinfo);
 // 执行事务
 db.getConnection((err, connection) => {
    // 开始事务
    connection.beginTransaction((err) => {
        if (err)  return res.cc(err.message);

        // 事务中的 SQL 操作语句
        const sql1 = `INSERT INTO borrowinghistory(bookname,time,returntime,username) VALUES(?,?,?,?)`
        const sql2 = `DELETE FROM borrowing WHERE id=?`
        // console.log(userinfo);
        // 事务中的第 1 个 SQL 操作
        connection.query(sql1,[userinfo.bookname,userinfo.time,userinfo.returntime,userinfo.username],(err, results, fields) => {
            if (err) {
                // 如果执行失败则回滚
                return connection.rollback(() => {
                     res.cc(err.message);
                });
            }

            // 事务中的第 2 个 SQL 操作
            connection.query(sql2,userinfo.id,(err, results, fields) => {
                if (err) {
                    // 如果执行失败则回滚
                    return connection.rollback(() => {
                         res.cc(err.message)
                    });
                }

                // 事务提交
                connection.commit((err) => {
                    if (err) {
                        // 如果提交失败则回滚
                        return connection.rollback(() => {
                             res.cc(err.message)
                        });
                    }
                    res.send({
                        status:0,
                        message:'归还成功!'
                    })
                });
            });
        });

        // 释放连接
        connection.release();
    });
});
}

//我的借阅记录
exports.Myborrowingrecords =(req,res)=>{
    const userinfo = req.body
        //定义查询总数sql
        let sql1 = `SELECT COUNT(*) AS total FROM borrowinghistory where username=?`
        db.query(sql1,req.user.username,(err, result) => {
            if (err) return res.cc(err)
            const total = result[0].total
    
            //定义分页查询sql
            let sql2 = 'SELECT * FROM borrowinghistory where username=? LIMIT ?, ?'
    
            db.query(sql2, [req.user.username,(req.body.currentPage - 1) * req.body.size, req.body.size], (err, result) => {
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
                        message: "我的借阅记录查询成功！",
                        data: {
                            result,
                            total: total
                        }
                    })
                }
            })
        })

}