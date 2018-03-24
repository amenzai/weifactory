<template>
  <el-row>
    <el-table :data="table.data" border>
      <el-table-column label="角色Id">
        <template slot-scope="scope">{{ scope.row.roleId }}</template>
      </el-table-column>
      <el-table-column label="角色名">
        <template slot-scope="scope">{{ scope.row.roleName }}</template>
      </el-table-column>
      <el-table-column label="角色中文名">
        <template slot-scope="scope">{{ scope.row.roleChineseName }}</template>
      </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">
            <router-link :to="{path:'/home/manager/menu-permission',query:{roleId:scope.row.roleId,name:scope.row.roleChineseName}}">菜单权限</router-link>
          </el-button>
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
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const send = this.table.send.pageNo + '/' + this.table.send.pageSize
      this.$ajax.get('role/list',send)
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
