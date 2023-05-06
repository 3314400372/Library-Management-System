<template>
  <div class="Lendingranking">
    <el-page-header
      style="margin-bottom: 15px"
      @back="$router.push('/home')"
      content="书籍借出排行"
    >
    </el-page-header>
    <el-card style="margin-top: 15px">
      <el-table :data="LendingrankingList" height="500" border style="width: 100%">
        <el-table-column prop="bookname" label="书名" width="180">
        </el-table-column>
        <el-table-column prop="count"  label="借出数量" width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {LendingrankingAPI} from '../request/api'
export default {
  data() {
    return {
        LendingrankingList:[]
    };
  },
  methods:{
  async  getLendingranking(){
     let res = await LendingrankingAPI()
     console.log(res);
     if (res.status == 0) {
            // this.$message({
            //   message: res.message,
            //   type: "success",
            // });
           this.LendingrankingList  = res.data
          } else {
            this.$message.error(res.message);
          }
    }
  },
  created(){
    this.getLendingranking()
  }
};
</script>
<style>
.Lendingranking{
    width: 35%;
}
.Lendingranking .el-card{
   position: relative;
   left: 400px;
}
</style>