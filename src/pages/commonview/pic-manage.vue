<template>
  <el-row>
    <el-table :data="table.data" border>
      <el-table-column label="设备序列号">
        <template scope="scope">{{ scope.row.sn }}</template>
      </el-table-column>
      <el-table-column label="采集图片时间">
        <template scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <a :href="scope.row.path" target="_blank">查看图片</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
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
            page: 1,
            pageSize: this.$CONSTANT.PAGE_SIZE
          },
          totalCount: 0,
          totalPages: 0,
          pageSelect: this.$CONSTANT.PAGE_SELECT
        }
      }
    },
    created() {
      this.userId = JSON.parse(window.sessionStorage.getItem('user')).userId
      this.getList()
    },
    methods: {
      getList() {
        const send = {
          userId: this.userId,
          page: this.table.send.page,
          pageSize: this.table.send.pageSize
        }
        this.$ajax.post('image/list', send)
          .then(res => {
            console.log('', res);
            this.table.data = res.data.list;
            this.table.totalCount = res.data.total;
            this.table.totalPages = res.data.pages;
          })
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
