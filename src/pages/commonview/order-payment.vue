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
    <el-dialog title="扫码支付" size="tiny" :visible.sync="visible" :modal-append-to-body="false">
      <div id="qrcode" style="text-align: center;"></div>
    </el-dialog>
  </el-row>
</template>
<script>
import querystring from 'querystring'
export default {
  data() {
      return {
        visible: false,
        qrcode: null,
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
        this.$ajax.get('dict/dictItemList', 'payChannel')
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
        this.visible = true
        const param = {
          'order_number': this.orderData.orderNumber,
          'way': this.payMode
        }
        const url = 'http://pay.weifactory.vastsum.net/pay'
        if (this.payMode === 'wechat') {
          this.$jsonp(url, param)
            .then(res => {
              console.log(res)
              $("#qrcode").qrcode(res)
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          window.open(url + '?' + querystring.stringify(param))
        }
      }
    }
}
</script>
<style scoped>

</style>
