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
        <el-form-item label="选择托管专家：">{{ orderData.expertName }}</el-form-item>
        <el-form-item label="费用：">{{ orderData.orderPrice | currency }}</el-form-item>
        <el-form-item label="支付方式：">
          <el-select placeholder="请选择" v-model="payMode">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in payChannel" :key="index"></el-option>
          </el-select>
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
        payChannel: [],
        payMode: 'alipay'
      }
    },
    created() {
      this.getPayChannel()
    },
    methods: {
      getPayChannel() {
        this.$ajax.get('dict/dictItemList','payChannel')
          .then(res => {
            this.payChannel = res.data.map(item => {
              return {
                label: item.itemName,
                value: item.itemCode
              }
            })
          })
      },
      paySubmit() {

      }
    }
  }

</script>
<style scoped>


</style>
