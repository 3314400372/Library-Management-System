<template>
  <div class="BookBorrowing">
    <el-page-header
      style="margin-bottom: 15px"
      @back="$router.push('/home')"
      content="图书管理"
    >
    </el-page-header>
    <el-card style="margin-top: 15px">
      <el-button type="primary" icon="el-icon-plus" size="small " @click="openAddBook">添加图书</el-button>

       <!-- 修过dialog -->
       <el-dialog
        title="修改书籍信息"
        :visible.sync="dialogVisible3"
        width="30%"
        :before-close="handleClose"
      >
        <span>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">书名</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input v-model="addbook.bookname"> </el-input></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">作者</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input v-model="addbook.author"> </el-input></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">简介</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input type="textarea" :rows="7" v-model="addbook.introduce"></el-input></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">售价</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input v-model="addbook.price"> </el-input></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">库存</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input v-model="addbook.inventory"> </el-input></div></el-col>
          </el-row>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="okAddBook">确 定</el-button>
        </span>
      </el-dialog>
      <el-table :data="bookList" border style="width: 100%;margin-top: 15px" >
        <el-table-column prop="id" label="id" width="60"> </el-table-column>
        <el-table-column prop="bookname" label="书名" width="100">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="120">
        </el-table-column>
        <el-table-column prop="introduce" label="介绍" width="650">
        </el-table-column>
        <el-table-column prop="price" label="售价" width="60">
        </el-table-column>
        <el-table-column prop="inventory" label="库存" width="60">
        </el-table-column>
        <el-table-column label="操作" width="186">
          <!-- 凹槽 -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="oponModify(scope.row)"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              type="danger"
              @click="oppendelect(scope.row)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block" style="margin-top: 20px">
        <!-- <span class="demonstration">完整功能</span> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 10, 30]"
          :page-size="3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <!-- page-size每页显示条目个数 -->
      </div>
      <!-- 修过dialog -->
      <el-dialog
        title="修改书籍信息"
        :visible.sync="dialogVisible1"
        width="30%"
        :before-close="handleClose"
      >
        <span>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">id</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input v-model="book.id" :disabled="true"> </el-input></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">书名</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input v-model="book.bookname"> </el-input></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">作者</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input v-model="book.author"> </el-input></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">简介</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input type="textarea" :rows="7" v-model="book.introduce"></el-input></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">售价</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input v-model="book.price"> </el-input></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><div class="grid-content bg-purple">库存</div></el-col>
            <el-col :span="20" ><div class="grid-content bg-purple-light">  <el-input v-model="book.inventory"> </el-input></div></el-col>
          </el-row>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="OkModify">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 删除dialog-->
      <el-dialog
        title="删除读者信息"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose"
      >
        <span> 确定删除吗？ </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="OkdelectUser">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SelectAllBookAPI, modifyBookAPI,delectBookAPI,AddBookAPI} from "@/request/api";
export default {
  computed: {
    //解构
    ...mapState(["username"]),
  },
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3:false,
      //当前页数
      currentPage: 1,
      size: 3,
      bookList: [],
      total: 1,
      dialogVisible: false,
      book: {
        id: "",
        bookname: "",
        author: "",
        introduce: "",
        price: "",
        inventory: "",
      },
      addbook: {
        bookname: "",
        author: "",
        introduce: "",
        price: "",
        inventory: "",
      },
      delectId: "",
    };
  },

  methods: {
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
      this.total = res.data.total >= 1 ? res.data.total : 0;
      console.log(res);
    },
    //打开修改dialog
    oponModify(row) {
      this.dialogVisible1 = true;
      this.book = row;
    },
    //确定修改
    async OkModify() {
      console.log(this.book);
      let res = await modifyBookAPI(this.book);
      if (res.status == 0) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.dialogVisible1 = false;
        this.getAllBooks();
      } else {
        this.$message.error(res.message);
      }
    },
    //打开删除dialog
    oppendelect(row) {
      this.dialogVisible2 = true;
      this.delectId = row.id;
    },
    //确定删除
    async OkdelectUser() {
      let res = await delectBookAPI({ id: this.delectId });
      if (res.status == 0) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.dialogVisible2 = false;
        this.getAllBooks();
      } else {
        this.$message.error(res.message);
      }
    },
    //打开添加提示框
    openAddBook(){
      this.dialogVisible3 = true
    },
    //确定添加
   async okAddBook(){
       const res =await AddBookAPI(this.addbook)
       console.log(res);
       if (res.status == 0) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.dialogVisible3 = false;
        this.getAllBooks();
      } else {
        this.$message.error(res.message);
      }
    }
  },
  created() {
    this.getAllBooks();
  },
};
</script>

<style lang="less">
.el-row{
  margin-top: 15px;
}
.el-dialog{
    margin-top: 5vh !important;
    width: 30%;
}
</style>