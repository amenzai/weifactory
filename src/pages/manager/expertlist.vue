<template>
  <el-row>
    <el-form ref="form" :inline="true" :model="table.send" @keyup.enter.native="getList" id="search-input">
      <el-form-item label="用户名：">
        <el-input v-model="table.send.userName"></el-input>
      </el-form-item>
      <el-form-item label="审批状态：">
        <el-select clearable placeholder="请选择" v-model="table.send.status">
          <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in authStatus" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="table.send.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="table.send.userEmail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-form-item>
    </el-form>
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
      <!-- <el-table-column label="审批状态">
        <template slot-scope="scope">{{ scope.row.status | seeLabel(authStatus) }}</template>
      </el-table-column> -->
      <el-table-column label="创建日期">
        <template slot-scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="修改日期">
        <template slot-scope="scope">{{ scope.row.gmtModified | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status === '0'">
            <el-button type="text" @click="auditPass(scope.row.userId,'1')">审批通过</el-button>
            <el-button type="text" @click="auditPass(scope.row.userId,'0')">拒绝</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.page" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
import { authStatusMixin } from 'common/js/mixin.js'
export default {
  mixins: [authStatusMixin],
  data() {
    return {
      table: {
        data: [],
        send: {
          userName: '',
          userPhone: '',
          status: '',
          userEmail: '',
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
  },
  methods: {
    getList() {
      this.$http.post('user/expertList', this.table.send).then(res => {
        console.log('', res)
        this.table.data = res.data.list
        this.table.totalCount = res.data.total
        this.table.totalPages = res.data.pages
      })
    },
    auditPass(userId, state) {
      const str = state == 1 ? '确定审批通过？' : '确定审批不通过？'
      const send = {
        userId: userId,
        status: state
      }
      this.$confirm(str, '提示', {
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('user/changeExport', send).then(res => {
            console.log('', res)
            var type = res.success ? 'success' : 'error'
            if (type === 'success') {
              this.getList()
            }
            this.$message({
              message: res.message,
              type: type
            })
          })
        })
        .catch(() => {})
    },
    searchList() {
      this.table.send.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.table.send.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.table.send.page = val
      this.getList()
    }
  }
}
</script>
<style scoped>
</style>
