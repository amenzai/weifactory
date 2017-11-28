<template>
  <el-row>
    <el-form :inline="true" ref="form" :model="table.send">
      <el-form-item label="设备序列号：">
        <el-input v-model="table.send.sn"></el-input>
      </el-form-item>
      <el-form-item label="服务器端口号：">
        <el-input v-model="table.send.serverPort"></el-input>
      </el-form-item>
      <el-form-item label="操作类型：">
        <el-select clearable v-model="table.send.optionType" placeholder="请选择">
          <el-option :label="item.label" :value="item.value" v-for="(item,index) in optionType" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="table.data" border>
      <el-table-column label="设备序列号">
        <template scope="scope">{{ scope.row.sn }}</template>
      </el-table-column>
      <el-table-column label="客户端IP">
        <template scope="scope">{{ scope.row.clientIpAddress }}</template>
      </el-table-column>
      <el-table-column label="客户端端口号">
        <template scope="scope">{{ scope.row.clientPort }}</template>
      </el-table-column>
      <el-table-column label="服务器端内网IP">
        <template scope="scope">{{ scope.row.serverIpAddress }}</template>
      </el-table-column>
      <el-table-column label="服务器外网IP">
        <template scope="scope">{{ scope.row.serverNetAddress }}</template>
      </el-table-column>
      <el-table-column label="服务器端口号">
        <template scope="scope">{{ scope.row.serverPort }}</template>
      </el-table-column>
      <el-table-column label="操作类型">
        <template scope="scope">{{ scope.row.optionType.toString() | seeValue(optionType) }}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
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
      optionType: [],
      table: {
        data: [],
        send: {
          sn: '',
          serverPort: '',
          optionType: '',
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
    this.getList()
    this.getOptionType()
  },
  methods: {
    getList() {
      this.$ajax.post('comm/list',this.table.send)
        .then(res => {
          console.log('', res);
          this.table.data = res.data.list;
          this.table.totalCount = res.data.total;
          this.table.totalPages = res.data.pages;
        })
    },
    getOptionType() {
      this.$ajax.get('dict/dictItemList','optionType')
        .then(res => {
          this.optionType = res.data.map(item => {
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
