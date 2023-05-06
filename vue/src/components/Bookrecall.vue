<template>
  <div class="BookBorrowing">
    <el-page-header
      style="margin-bottom: 15px"
      @back="$router.push('/home')"
      content="借出图书"
    >
    </el-page-header>
    <el-card style="margin-top: 15px">
      <el-table :data="recordList" border style="width: 100%">
        <el-table-column prop="id" label="id" width="60"> </el-table-column>
        <el-table-column prop="bookname" label="书名" width="280">
        </el-table-column>
        <el-table-column prop="time" label="借阅时间" width="280">
        </el-table-column>
        <el-table-column prop="username" label="借阅用户" width="280">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <!-- 凹槽 -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="oppen(scope.row)"
              size="small "
              v-if="scope.row.urgerepayment === 1"
              >催还图书</el-button
            >
            <el-button type="info" size="small" @click="areyouok" v-else
              >已催还</el-button
            >
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

    <!-- 催还图书dialog -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>确定催还吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="recallOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
import { SelectAllorrowingrecordsAPI, BookrecallAPI } from "@/request/api";
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
      recordList: [],
      dialogVisible: false,
      id: "",
    };
  },

  methods: {
    //打开催还面板
    oppen(row) {
      this.dialogVisible = true;
      this.id = row.id;
    },
    //确定催还
    async recallOK() {
      let res = await BookrecallAPI({ id: this.id });
      console.log(res);
      if (res.status == 0) {
        //催还成功
        this.$message({
          message: res.message,
          type: "success",
        });
        this.dialogVisible = false;
        this.getAllorrowingrecords();
      } else {
        this.$message.error(res.message);
      }
    },
    areyouok() {
      this.$message({
        message: "不要着急，已经催过了！",
        type: "success",
      });
    },
    //查询所有借出图书
    async getAllorrowingrecords() {
      let res = await SelectAllorrowingrecordsAPI(this.paging);
      if (res.status == 0) {
        // this.$message({
        //   message: res.message,
        //   type: "success",
        // });
        //非空验证
        if (!res.data || !Array.isArray(res.data)) {
          return;
        }
        this.paging.total = res.total >= 1 ? res.total : 0;
        //转换为北京时间
        const beijingOffset = new Date().getTimezoneOffset() / -60; // 获取当前时区与 UTC 的时差（小时数）
        const beijingOffsetString =
          beijingOffset < 0
            ? "-"
            : "+" + Math.abs(beijingOffset).toString().padStart(2, "0"); // 将时差转换为格式为 "+08" 的字符串
        const beijingTimeRegex = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*$/;

        this.recordList = res.data.map((book) => {
          const { time } = book;
          const beijingTimeString = time.replace(beijingTimeRegex, `$1 $2`);
          return { ...book, time: beijingTimeString };
        });
      } else {
        this.$message.error(res.message);
      }

      // console.log(this.recordList);
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
      this.getAllorrowingrecords();
    },
    handleCurrentChange(val) {
      this.paging.currentPage = val;
      this.getAllorrowingrecords();
    },
  },
  created() {
    this.getAllorrowingrecords();
  },
};
</script>
  
  <style>
</style>