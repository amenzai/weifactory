<template>
  <el-row>
    <el-form :inline="true" ref="form" :model="table.send">
      <el-form-item label="设备序列号：">
        <el-input v-model="table.send.sn"></el-input>
      </el-form-item>
      <el-form-item label="异常类型：">
        <el-select clearable v-model="table.send.exceptionType" placeholder="请选择">
          <el-option :label="item.label" :value="item.value" v-for="(item,index) in exceptionType" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="table.data" border>
      <el-table-column label="设备序列号">
        <template slot-scope="scope">{{ scope.row.sn }}</template>
      </el-table-column>
      <el-table-column label="异常类型">
        <template slot-scope="scope">{{ scope.row.exceptionType.toString() | seeLabel(exceptionType)}}</template>
      </el-table-column>
      <el-table-column label="异常内容">
        <template slot-scope="scope">{{ scope.row.exceptionContent }}</template>
      </el-table-column>
      <el-table-column label="发生异常时间">
        <template slot-scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.page" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      userId: '',
      exceptionType: [],
      table: {
        data: [],
        send: {
          sn: '',
          userId: '',
          exceptionType: '',
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
    this.table.send.userId = JSON.parse(window.sessionStorage.getItem('user')).userId
    this.getList()
    this.getExceptionType()
  },
  methods: {
    getList() {
      this.$ajax.post('exception/list',this.table.send)
        .then(res => {
          console.log('', res);
          this.table.data = res.data.list;
          this.table.totalCount = res.data.total;
          this.table.totalPages = res.data.pages;
        })
    },
    getExceptionType() {
      this.$ajax.get('dict/dictItemList','exceptionType')
        .then(res => {
          this.exceptionType = res.data.map(item => {
            return {
              label: item.itemName,
              value: item.itemCode
            }
          })
        })
    },
    handleSizeChange(val) {
      this.table.send.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.table.send.page = val;
      this.getList();
    },
    searchList() {
      this.table.send.page = 1
      this.getList();
    }
  }
}
</script>
<style scoped>

</style>
