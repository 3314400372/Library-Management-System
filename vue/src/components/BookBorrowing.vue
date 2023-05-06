<template>
  <div class="BookBorrowing">
    <el-page-header
          style="margin-bottom: 15px"
          @back="$router.push('/home')"
          content="图书中心" 
        >
        </el-page-header>
    <el-card style="margin-top: 15px">
      <el-table :data="bookList" border style="width: 100%">
        <el-table-column prop="id" label="id" width="60"> </el-table-column>
        <el-table-column prop="bookname" label="书名" width="120">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="120">
        </el-table-column>
        <el-table-column prop="introduce" label="介绍" width="680">
        </el-table-column>
        <el-table-column prop="price" label="售价" width="60">
        </el-table-column>
        <el-table-column prop="inventory" label="库存" width="60">
        </el-table-column>
        <el-table-column label="操作" width="80">
          <!-- 凹槽 -->
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-shopping-cart-2"
              @click="open(scope.row)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block" style="margin-top: 20px;">
        <!-- <span class="demonstration">完整功能</span> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 3, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <!-- page-size每页显示条目个数 -->
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>是否确定借阅？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="JoinBorrowing">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import gettime from "../utlis/gettime";
import { SelectAllBookAPI, JoinBorrowingAPI } from "@/request/api";
export default {
  computed: {
    //解构
    ...mapState(["username"]),
  },
  data() {
    return {
      //当前页数
      currentPage: 1,
      size: 5,
      bookList: [],
      total: 1,
      dialogVisible: false,
      BorrowingBook: {
        bookname: "",
        time: "",
        username: "",
      },
    };
  },

  methods: {
    //打开Dialog
    open(row) {
      this.BorrowingBook.bookname = row.bookname;
      this.BorrowingBook.username = this.username;
      // 使用 gettime() 获取当前时间字符串并进行赋值
      this.BorrowingBook.time = gettime();
      this.dialogVisible = true;

      // console.log(this.BorrowingBook.bookname);
      // console.log(this.BorrowingBook.username);
      // console.log(this.BorrowingBook.time);
    },
    //确定借阅
    async JoinBorrowing() {
      let res = await JoinBorrowingAPI(this.BorrowingBook);
      // console.log(res);
      if (res.status == 0) {
        //借阅成功
        this.$message({
          message: res.message,
          type: "success",
        });
        this.dialogVisible = false;
        this.getAllBooks();
      } else {
        this.$message.error(res.message);
      }
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSizeChange(val) {
      this.size = val;
      this.getAllBooks();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllBooks();
    },
    //查询所有图书
    async getAllBooks() {
      let obj = {
        currentPage: this.currentPage,
        size: this.size,
      };
      let res = await SelectAllBookAPI(obj);
      this.bookList = res.data.result;
      this.total = res.data.total >= 1 ? res.data.total : 5;
      console.log(res);
    },
  },
  created() {
    this.getAllBooks();
  },
};
</script>

<style>
</style>