<template>
  <el-row>
    <el-col :span="14" :offset="2">
      <el-form ref="submitForm" label-width="120px">
        <el-form-item label="订单号：">{{ orderDetail.orderNumber }}</el-form-item>
        <el-form-item label="订单名称：">{{ orderDetail.orderBody }}</el-form-item>
        <el-form-item label="设备序列号：">{{ orderDetail.sn }}</el-form-item>
        <el-form-item label="托管方式：">{{ orderDetail.deposit | seeLabel(hostType) }}</el-form-item>
        <el-form-item label="选择托管专家：">{{ orderDetail.expertName }}</el-form-item>
        <el-form-item label="支付渠道：">{{ orderDetail.payChannel | seeLabel(payChannel) }}</el-form-item>
        <el-form-item label="订单价格：">{{ orderDetail.orderPrice | currency }}</el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { depositMixin, payChannelMixin } from 'common/js/mixin.js'
export default {
  mixins: [depositMixin, payChannelMixin],
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
      this.$http.get('order', this.orderId).then(res => {
        console.log('', res)
        this.orderDetail = res.data
      })
    }
  }
}
</script>
<style scoped>
</style>
