<template>
  <el-row>
    <el-col :span="14" :offset="2">
      <el-form ref="submitForm" label-width="120px">
        <el-form-item label="订单号：">{{ orderData.orderNumber }}</el-form-item>
        <el-form-item label="第一层蔬菜名称：">{{ orderData.plantOne }}</el-form-item>
        <el-form-item label="第二层蔬菜名称：">{{ orderData.plantTwo }}</el-form-item>
        <el-form-item label="第三层蔬菜名称：">{{ orderData.plantThree }}</el-form-item>
        <el-form-item label="第一层栽培模式：">{{ orderData.modeOne }}</el-form-item>
        <el-form-item label="第二层栽培模式：">{{ orderData.modeTwo }}</el-form-item>
        <el-form-item label="第三层栽培模式：">{{ orderData.modeThree }}</el-form-item>
        <el-form-item label="托管方式：">{{ orderData.deposit === '1' ? '全托管方式' : '自定义托管方式' }}</el-form-item>
        <el-form-item label="选择托管专家：">{{ orderData.expertId }}</el-form-item>
        <el-form-item label="费用：">{{ orderData.cost }}</el-form-item>
        <el-form-item label="支付方式：">
          <el-radio-group v-model="payMode">
              <el-radio label="alipay">支付宝</el-radio>
              <el-radio label="weichat">微信支付</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item class="ta-c">
          <el-button type="primary" @click="paySubmit">支付</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      orderData: this.$store.state.orderPay,
      payMode: 'alipay'
    }
  },
  mounted() {
    this.order
    this.getList()
  },
  methods: {
    getList() {
      // successcompanyList(this.table.send)
      //   .then(res => {
      //     console.log('angent/sea', res);
      //     this.table.data = res.data.result;
      //     this.table.totalCount = res.data.totalCount;
      //     this.table.totalPages = res.data.totalPages;
      //   })
    },
    paySubmit() {

    }
  }
}
</script>
<style scoped>
  
</style>
