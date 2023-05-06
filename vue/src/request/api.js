import  request from  '@/request/request.js'
//封装接口

//登录
export const LoginAPI=(params)=>request.post('/api/login',params)

//注册
export const RegisterAPI=(params)=>request.post('/api/reguser',params)

//查询所有图书
export const SelectAllBookAPI=(params)=>request.post('/readers/selectallbook',params)

//借阅
export const JoinBorrowingAPI=(params)=>request.post('/readers/BorrowingBook',params)

//查询个人已经借阅图书
export const BookRturnSellctAPI=(params)=>request.post('/readers/BookRturnSellct',params)

//查询我的借阅记录
export const MyborrowingrecordsAPI=(params)=>request.post('/readers/Myborrowingrecords',params)

//图书归还
export const returnbookApi=(params)=>request.post('/readers/returnbook',params)

//查询所有读者
export const SelectAllreaderAPI=(params)=>request.post('/admin/selectAllreader',params)

//修改读者信息
export const ReaderinformationApi=(params)=>request.post('/admin/Readerinformation',params)

//删除读者
export const deleteuserApi=(params)=>request.post('/admin/deleteuser',params)

//查询所有借出图书
export const SelectAllorrowingrecordsAPI=(params)=>request.post('/admin/selectAlllendBook',params)

//查询所有借阅记录
export const AllborrowingrecordsAPI=(params)=>request.post('/admin/Allborrowingrecords',params)

//修改图书
export const modifyBookAPI=(params)=>request.post('/admin/modifyBook',params)

//删除图书
export const delectBookAPI=(params)=>request.post('/admin/delectBook',params)

//催还图书
export const BookrecallAPI=(params)=>request.post('/admin/bookrecall',params)

//添加图书
export const AddBookAPI=(params)=>request.post('/admin/addBook',params)

//书籍借出排行榜
export const LendingrankingAPI=()=>request.get('/admin/Lendingranking')