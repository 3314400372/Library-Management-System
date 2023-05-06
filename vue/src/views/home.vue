<template>
  <div class="home">
    <el-container>
      <el-header>
        <h1>图书管理系统</h1>
        <p>欢迎您:<span>   <i class="el-icon-user" v-if="role =='用户' "></i><i class="el-icon-setting" v-else></i>{{ username }}</span></p>

        <el-button size="mini" @click="ReturnLogin()" type="info">退出登录</el-button>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">读者</span>
              </template>

              <el-menu-item index="1-1" @click="$router.push('/user/BookBorrowing')">图书中心</el-menu-item>
              <el-menu-item index="1-2" @click="$router.push('/user/BookReturn')">正在借阅</el-menu-item>
              <el-menu-item index="1-3" @click="$router.push('/user/MyBorrowingRecords')">我的借阅记录</el-menu-item>
            </el-submenu>
            <el-submenu index="2" v-if="role =='管理员' ">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">管理员</span>
              </template>

              <el-menu-item index="2-1"  @click="$router.push('/admin/ReaderAdmin')">读者信息管理</el-menu-item>
              <el-menu-item index="2-2" @click="$router.push('/admin/BookAdmin')">图书管理</el-menu-item>
              <el-menu-item index="2-3" @click="$router.push('/admin/Bookrecall')">借出图书</el-menu-item>
              <el-menu-item index="2-4" @click="$router.push('/admin/BorrowingRecords')">借阅记录</el-menu-item>
              <el-menu-item index="2-5" @click="$router.push('/admin/Lendingranking')">图书借出排行</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 路由占位符 -->
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//导入vuex
import {  mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
 computed:{
    //解构
    ...mapState(["username","role"])
 },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //退出登录
    ReturnLogin(){
        localStorage.removeItem('book_token')
        this.$router.push('/login')
        this.$message({
          message:'退出成功！',
          type: 'success'
        });
    }
  },
};
</script>

<style lang="less">
.home {
  width: 1536px;
  height: 791px;
  > .el-container {
    .el-header {
      height: 100px !important;
      line-height: 100px;
      width: 1536px;
      padding: 0px;
      background-color: #9da7c0bf;
      position: relative;
      h1 {
        display: inline-block;
        position: absolute;
        left: 696px;
        font-size: 28px;
        color: #2f39339e;
      }
      p {
        display: inline-block;
        position: absolute;
        right: 130px;
      }
      button {
        display: inline-block;
        position: absolute;
        right: 40px;
        top: 36px;
      }
    }
    > .el-container {
      .el-aside {
        height: 691px;
        background-color: #949aa3b3;
      }
      .el-main {
        width: 100%;
        height: 691px;
        background-color:#8da99c8c;
      }
    }
  }
}
</style>