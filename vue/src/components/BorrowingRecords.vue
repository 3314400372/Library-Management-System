<template>
  <div class="MyBorrowingRecords">
    <template>
      <el-page-header
        style="margin-bottom: 15px"
        @back="$router.push('/home')"
        content="借阅记录"
      >
      </el-page-header>
      <el-card style="margin-top: 15px">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="id" width="100"></el-table-column>
          <el-table-column
            prop="bookname"
            label="书名"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="借阅时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="returntime"
            label="归还时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="借阅者姓名"
            width="180"
          ></el-table-column>
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
    </template>
  </div>
</template>

</template>
<script>
import { AllborrowingrecordsAPI } from "@/request/api";
export default {
  data() {
    return {
      paging: {
        currentPage: 1,
        size: 5,
        total: 1,
      },
      tableData: [],
    };
  },
  methods: {
    //获取所有借阅记录
    async getMyborrowingrecords() {
      let res = await AllborrowingrecordsAPI(this.paging);
      if (res.status == 0) {
        // this.$message({
        //   message: res.message,
        //   type: "success",
        // });
        //非空验证
        if (!res.data.result || !Array.isArray(res.data.result)) {
          return;
        }
        this.paging.total = res.data.total >= 1 ? res.data.total : 0;

        //转换为北京时间
        const beijingOffset = new Date().getTimezoneOffset() / -60; // 获取当前时区与 UTC 的时差（小时数）
        const beijingOffsetString =
          beijingOffset < 0
            ? "-"
            : "+" + Math.abs(beijingOffset).toString().padStart(2, "0"); // 将时差转换为格式为 "+08" 的字符串
        const beijingTimeRegex = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*$/;

        this.tableData = res.data.result.map((book) => {
          const { time, returntime } = book;
          const beijingTimeString = time.replace(beijingTimeRegex, `$1 $2`);
          const beijingreturnTimeString = returntime.replace(
            beijingTimeRegex,
            `$1 $2`
          );
          return {
            ...book,
            time: beijingTimeString,
            returntime: beijingreturnTimeString,
          };
        });
      } else {
        this.$message.error(res.message);
      }
      console.log(this.tableData);
    },
    handleSizeChange(val) {
      this.paging.size = val;
      this.getMyborrowingrecords();
    },
    handleCurrentChange(val) {
      this.paging.currentPage = val;
      this.getMyborrowingrecords();
    },
  },
  created() {
    this.getMyborrowingrecords();
  },
};
</script>

<style>
</style>