<template>
  <el-row>
    <el-col :span="14" :offset="2">
      <el-form ref="submitForm" label-width="120px">
        <el-form-item label="订单号：">{{ orderDetail.orderNumber }}</el-form-item>
        <el-form-item label="订单名称：">{{ orderDetail.orderBody }}</el-form-item>
        <el-form-item label="设备序列号：">{{ orderDetail.sn }}</el-form-item>
        <el-form-item label="第一层蔬菜名称：">{{ orderDetail.plantOne }}</el-form-item>
        <el-form-item label="第二层蔬菜名称：">{{ orderDetail.plantTwo }}</el-form-item>
        <el-form-item label="第三层蔬菜名称：">{{ orderDetail.plantThree }}</el-form-item>
        <el-form-item label="第一层栽培模式：">{{ orderDetail.modeOne }}</el-form-item>
        <el-form-item label="第二层栽培模式：">{{ orderDetail.modeTwo }}</el-form-item>
        <el-form-item label="第三层栽培模式：">{{ orderDetail.modeThree }}</el-form-item>
        <el-form-item label="托管方式：">{{ orderDetail.deposit === '1' ? '全托管方式' : '自定义托管方式' }}</el-form-item>
        <el-form-item label="选择托管专家：">{{ orderDetail.expertId }}</el-form-item>
        <el-form-item label="支付渠道：">{{ orderDetail.payChannel }}</el-form-item>
        <el-form-item label="订单价格：">{{ orderDetail.orderPrice }}</el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      orderId: this.$route.query.orderId,
      orderDetail: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$ajax.get('order',this.orderId)
        .then(res => {
          console.log('', res);
          this.orderDetail = res.data;
        })
    }
  }
}
</script>
<style scoped>
  
</style>
