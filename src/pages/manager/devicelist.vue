<template>
  <el-row>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="设备序列号" width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="getDetail(scope.row.deviceId,scope.row.sn)">{{ scope.row.sn }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="设备规格">
        <template slot-scope="scope">{{ scope.row.deviceType }}</template>
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.pageNo" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount"> </el-pagination>
    </div>
    <add-device ref="AddDevice" :title="title" :data="data" @submit="getList"></add-device>
  </el-row>
</template>
<script>
  import AddDevice from '../components/addDevice.vue'
  export default {
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
        this.$ajax.get('device/list', send).then(res => {
          console.log('', res);
          this.table.data = res.data.list;
          this.table.totalCount = res.data.total;
          this.table.totalPages = res.data.pages;
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
          type: 'warning'
        }).then(() => {
          this.$ajax.get('device/delete', id).then(res => {
            this.getList();
            this.$message.success(res.message);
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
