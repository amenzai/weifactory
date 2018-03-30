<template>
  <div>
    <el-button>
      <router-link :to="{ path: '/home/commonview/history-data'}">查询历史数据</router-link>
    </el-button>
    <el-button v-if="trustStatus === '0'">
      <router-link :to="{ path: '/home/commonview/apply-manage'}">申请专家托管</router-link>
    </el-button>
    <el-button v-if="trustStatus === '0'" @click="applyServer">申请服务器托管</el-button>
  </div>
</template>
<script>
export default {
  props: {
    trustStatus: String
  },
  data() {
    return {};
  },
  created() {
    this.batchInfo = this.$store.state.batchInfo;
  },
  methods: {
    applyServer() {
      this.$ajax.get('control/trust', this.batchInfo.batchId).then(res => {
        this.$message.success('申请成功！')
        this.trustStatus = res.data
      })
    }
  }
};
</script>
<style scoped lang="less">

</style>
