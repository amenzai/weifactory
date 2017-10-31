<template>
  <el-row>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="用户名">
        <template scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column label="手机号">
        <template scope="scope">{{ scope.row.userPhone }}</template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template scope="scope">{{ scope.row.userEmail }}</template>
      </el-table-column>
      <el-table-column label="创建日期">
        <template scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="修改日期">
        <template scope="scope">{{ scope.row.gmtModified | dateFilter }}</template>
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
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const send = this.table.send.pageNo + '/' + this.table.send.pageSize
      this.$ajax.get('user/expertList',send)
        .then(res => {
          console.log('', res);
          this.table.data = res.data.list;
          this.table.pageNo = res.data.firstPage;
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
