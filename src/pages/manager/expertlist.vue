<template>
  <el-row>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="用户名">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">{{ scope.row.userPhone }}</template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">{{ scope.row.userEmail }}</template>
      </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="修改日期">
        <template slot-scope="scope">{{ scope.row.gmtModified | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="auditPass(scope.row.userId,1)">审批通过</el-button>
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
    auditPass(userId,state) {
      const send = {
        userId: userId,
        status: state
      }
      this.$confirm('确定审批通过？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post('user/changeExport', send)
          .then(res => {
            console.log('', res);
            var type = res.success ? 'success' : 'error';
            if (type === 'success') {
              this.getList();
            }
            this.$message({
              message: res.message,
              type: type
            });
          })
      }).catch(() => {});
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
