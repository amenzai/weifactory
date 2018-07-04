<template>
  <el-row>
    <el-form ref="form" :inline="true" :model="table.send" @keyup.enter.native="getList">
      <el-form-item label="设备序列号：">
        <el-input v-model="table.send.sn"></el-input>
      </el-form-item>
      <el-form-item label="设备规格：">
        <el-select clearable placeholder="请选择" v-model="table.send.deviceType">
          <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in typeDic" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input v-model="table.send.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="设备序列号" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="getDetail(scope.row.deviceId,scope.row.sn)">{{ scope.row.sn }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="设备规格">
        <template slot-scope="scope">{{ scope.row.deviceType | seeLabel(typeDic)}}</template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">{{ scope.row.note }}</template>
      </el-table-column>
      <el-table-column label="添加日期">
        <template slot-scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="getDetail(scope.row.deviceId,scope.row.sn)">查看</el-button>
          <el-button @click="modifyDevice(scope.row)" type="text">修改</el-button>
          <el-button @click="deleteDevice(scope.row.deviceId)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.page" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount"> </el-pagination>
    </div>
    <add-device ref="AddDevice" :title="title" :data="data" @submit="getList"></add-device>
  </el-row>
</template>
<script>
import AddDevice from '../components/addDevice.vue'
import { deviceTypeMixin } from 'common/js/mixin.js'
export default {
  mixins: [deviceTypeMixin],
  components: {
    AddDevice
  },
  data() {
    return {
      title: '',
      data: {},
      table: {
        data: [],
        send: {
          sn: '',
          deviceType: '',
          username: '',
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
      this.$http.post('device/search', this.table.send).then(res => {
        console.log('', res)
        this.table.data = res.data.list
        this.table.totalCount = res.data.total
        this.table.totalPages = res.data.pages
      })
    },
    getDetail(id, sn) {
      this.$router.push('/home/commonview/device-detail/' + id)
      window.sessionStorage.setItem('sn', sn)
      window.sessionStorage.setItem('isShow', true)
    },
    modifyDevice(data) {
      this.title = '修改设备信息'
      this.data = JSON.parse(JSON.stringify(data))
      this.$refs.AddDevice.visible = true
      this.$refs.AddDevice.init()
    },
    deleteDevice(id) {
      this.$confirm('确定删除设备吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$http.get('device/delete', id).then(res => {
            this.getList()
            this.$message.success(res.message)
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
