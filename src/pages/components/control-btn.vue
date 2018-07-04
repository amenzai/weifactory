<template>
  <div>
    <el-button @click="$router.push('/home/commonview/history-data')">
      查询历史数据
    </el-button>
    <el-button v-if="trustStatus === '0'" @click="$router.push('/home/commonview/apply-manage')">
      申请专家托管
    </el-button>
    <el-button v-if="trustStatus === '0'" @click="applyServer">申请服务器托管</el-button>
    <el-button v-if="trustStatus !== '0'" @click="cancelHost" :disabled="userInfo.roleName === 'ROLE_EXPERT'">取消托管</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      trustStatus: '',
      userInfo: {}
    }
  },
  created() {
    this.batchInfo = this.$store.state.batchInfo
    this.userInfo = this.$store.state.userInfo
    this.getDeviceDetail()
  },
  methods: {
    getDeviceDetail() {
      this.$http.get('device/deviceInfo', this.batchInfo.deviceId).then(res => {
        this.trustStatus = res.data.trustStatus
      })
    },
    applyServer() {
      this.$confirm('确定申请服务器托管?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$http.get('trust', `device/${this.batchInfo.deviceId}/trustStatus/1`).then(res => {
            this.$message.success('申请成功！')
            this.getDeviceDetail()
          })
        })
        .catch(() => {})
    },
    cancelHost() {
      this.$confirm('确定取消托管?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$http.get('trust/cancle/deviceId', this.batchInfo.deviceId).then(res => {
            this.$message.success('取消托管成功！')
            this.getDeviceDetail()
          })
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped lang="less">

</style>
