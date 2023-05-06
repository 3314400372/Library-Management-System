<template>
  <div class="BookBorrowing">
    <el-page-header
      style="margin-bottom: 15px"
      @back="$router.push('/home')"
      content="读者信息管理"
    >
    </el-page-header>
    <el-card style="margin-top: 15px">
      <el-table :data="bookList" border style="width: 100%">
        <el-table-column prop="id" label="id" width="120"> </el-table-column>
        <el-table-column prop="username" label="username" width="280">
        </el-table-column>
        <el-table-column label="操作" width="300">
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
          :current-page="paging.currentPage"
          :page-sizes="[2, 3, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paging.total"
        >
        </el-pagination>
        <!-- page-size每页显示条目个数 -->
      </div>
    </el-card>
    <!-- 修过dialog -->
    <el-dialog
      title="修改账号信息"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        id:<el-input v-model="user.id" :disabled="true"></el-input>

        账号:
        <el-input prefix-icon="el-icon-user" v-model="user.username">
        </el-input>
        密码:
        <el-input
          prefix-icon="el-icon-lock"
          v-model="user.password"
          show-password
        >
        </el-input>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  SelectAllreaderAPI,
  ReaderinformationApi,
  deleteuserApi,
} from "@/request/api";
export default {
  computed: {
    //解构
    ...mapState(["username"]),
  },
  data() {
    return {
      paging: {
        currentPage: 1,
        size: 5,
        total: 1,
      },
      bookList: [],
      dialogVisible1: false,
      dialogVisible2: false,
      user: {
        id: "",
        username: "",
        password: "",
      },
      delectId: "",
    };
  },

  methods: {
    //查询所有读者
    async getAllreader() {
      let res = await SelectAllreaderAPI(this.paging);

      if (res.status == 0) {
        // this.$message({
        //   message: res.message,
        //   type: "success",
        // });
        this.paging.total = res.total >= 1 ? res.total : 0;
        this.bookList = res.data;
      } else {
        this.$message.error(res.message);
      }
      // console.log(this.bookList);
    },
    //打开修改dialog
    oponModify(row) {
      this.dialogVisible1 = true;
      this.user = row;
    },
    //确定修改
    async OkModify() {
      console.log(this.user);
      let res = await ReaderinformationApi(this.user);
      if (res.status == 0) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.dialogVisible1 = false;
        this.getAllreader();
      } else {
        this.$message.error(res.message);
      }
    },
    //打开修改dialog
    oppendelect(row) {
      this.dialogVisible2 = true;
      this.delectId = row.id;
    },
    //确定删除
    async OkdelectUser() {
      let res = await deleteuserApi({ id: this.delectId });
      if (res.status == 0) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.dialogVisible2 = false;
        this.getAllreader();
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
      this.paging.size = val;
      this.getAllreader();
    },
    handleCurrentChange(val) {
      this.paging.currentPage = val;
      this.getAllreader();
    },
  },
  created() {
    this.getAllreader();
  },
};
</script>

<style>
</style>