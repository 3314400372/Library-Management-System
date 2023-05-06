import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'
import home from '../views/home.vue'
import BookBorrowing from '../components/BookBorrowing.vue'
import BookReturn from '../components/BookReturn.vue'
import MyBorrowingRecords from '../components/MyBorrowingRecords.vue'
import ReaderAdmin from '../components/ReaderAdmin.vue'
import BorrowingRecords from '../components/BorrowingRecords.vue'
import BookAdmin from '../components/BookAdmin.vue'
import Bookrecall from '../components/Bookrecall.vue'
import Lendingranking from '../components/Lendingranking.vue'
import welcome from '../components/welcome.vue'
import {Message} from 'element-ui';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    children:[
      {path:'/',component:welcome},//欢迎页
      {path:'/user/BookBorrowing',component:BookBorrowing},//图书借阅
      {path:'/user/BookReturn',component:BookReturn},//图书归还
      {path:'/user/MyBorrowingRecords',component:MyBorrowingRecords},//我的借阅记录
      {path:'/admin/ReaderAdmin',component:ReaderAdmin},//读者信息管理
      {path:'/admin/BorrowingRecords',component:BorrowingRecords},//借阅记录
      {path:'/admin/BookAdmin',component:BookAdmin},//图书管理
      {path:'/admin/Bookrecall',component:Bookrecall},//借出图书查询
      {path:'/admin/Lendingranking',component:Lendingranking},//书籍借出排行
    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  /**
   * to将要访问的路径
   * from表示从哪一个路径跳转而来
   * next（）放行 next（‘/login） 强制跳转
   */
  if(to.path === './login')
  return next()
  //获取token
  const toKenStr = localStorage.getItem('book_token')
  if(!toKenStr && to.path !== '/login') 
  {
    Message.error("你未登录！")
    return next('/login')
  }
  else
  {next()}
})

//解决跳转同一路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
