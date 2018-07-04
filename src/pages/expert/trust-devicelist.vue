<template>
  <el-row>
    <el-table :data="table.data" border>
      <el-table-column label="设备序列号">
        <template slot-scope="scope">
          <el-button type="text" @click="getDetail(scope.row.deviceId,scope.row.sn,false)">{{ scope.row.sn }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="添加日期">
        <template slot-scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="getDetail(scope.row.deviceId,scope.row.sn,false)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10" v-if="userId === 2">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.pageNo" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
      return {
        userId: '',
        table: {
          data: [],
          send: {
            pageNo: 1,
            pageSize: this.$CONSTANT.PAGE_SIZE
          },
          totalCount: 0,
          totalPages: 0,
          pageSelect: this.$CONSTANT.PAGE_SELECT
        }
      }
    },
    created() {
      this.userId = this.$store.state.userId
      this.getList()
    },
    methods: {
      getList() {
        const send = this.userId + '/' + this.table.send.pageNo + '/' + this.table.send.pageSize
        this.$http.get('device/list/trust', send)
          .then(res => {
            console.log('', res);
            this.table.data = res.data.list;
            this.table.pageNo = res.data.firstPage;
            this.table.totalCount = res.data.total;
            this.table.totalPages = res.data.pages;
          })
      },
      getDetail(id,sn) {
        this.$router.push('/home/commonview/device-detail/' + id)
        window.sessionStorage.setItem('sn',sn)
        window.sessionStorage.setItem('isShow',false)
      },
      handleSizeChange(val) {
        this.table.send.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.table.send.pageNo = val;
        this.getList();
      }
    }
}
</script>
<style scoped>
</style>
