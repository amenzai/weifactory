<template>
  <el-row>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="设备序列号">
        <template scope="scope">{{ scope.row.sn }}</template>
      </el-table-column>
      <el-table-column label="第一层蔬菜名称">
        <template scope="scope">{{ scope.row.plantOne }}</template>
      </el-table-column>
      <el-table-column label="第一层栽培模式">
        <template scope="scope">{{ scope.row.cultModelOne | getValue('cultModel')}}</template>
      </el-table-column>
      <el-table-column label="第二层蔬菜名称">
        <template scope="scope">{{ scope.row.plantTwo }}</template>
      </el-table-column>
      <el-table-column label="第二层栽培模式">
        <template scope="scope">{{ scope.row.cultModelTwo | getValue('cultModel')}}</template>
      </el-table-column>
      <el-table-column label="第三层蔬菜名称">
        <template scope="scope">{{ scope.row.plantThree }}</template>
      </el-table-column>
      <el-table-column label="第三层栽培模式">
        <template scope="scope">{{ scope.row.cultModelThree | getValue('cultModel')}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text" size="small">
            <router-link :to="{path:'/home/manager/batch-detail',query:{id:scope.row.batchId}}">查看</router-link>
          </el-button>
          <el-button @click="deleteBatch(scope.row.batchId)" type="text" size="small">删除</el-button>
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
        this.$ajax.get('batch/history', send)
          .then(res => {
            console.log('', res);
            this.table.data = res.data.list;
            this.table.pageNo = res.data.firstPage;
            this.table.totalCount = res.data.total;
            this.table.totalPages = res.data.pages;
          })
      },
      deleteBatch(id) {
        this.$confirm('确定删除批次吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          tpyp: 'warning'
        }).then(() => {
          this.$ajax.get('batch/delete', id)
            .then(res => {
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
