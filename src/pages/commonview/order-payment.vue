<template>
  <el-row>
    <el-col :span="14" :offset="2">
      <el-form ref="submitForm" label-width="120px">
        <el-form-item label="订单号：">{{ orderData.orderNumber }}</el-form-item>
        <el-form-item label="设备序列号：">{{ orderData.sn }}</el-form-item>
        <el-form-item label="托管方式：">{{ orderData.deposit | seeLabel(hostType) }}</el-form-item>
        <el-form-item label="选择托管专家：">{{ orderData.expertId | seeLabel(expertArr) }}</el-form-item>
        <el-form-item label="总费用：">{{ orderData.orderPrice | currency }}</el-form-item>
        <el-form-item label="支付方式：">
          <el-select placeholder="请选择" v-model="payMode">
            <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in payChannel" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="ta-c">
          <el-button type="primary" @click="paySubmit">支付</el-button>
          <el-button @click="returnBatch">返回批次信息</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-dialog title="扫码支付" :visible.sync="visible" :modal-append-to-body="false" :close-on-click-modal="false">
      <div id="qrcode" style="text-align: center;"></div>
    </el-dialog>
    <!-- <el-dialog title="订单支付确认" :visible.sync="visible1" :modal-append-to-body="false" :close-on-click-modal="false">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="jump">支付成功</el-button>
        <el-button @click="jump">支付失败</el-button>
      </span>
    </el-dialog> -->
  </el-row>
</template>
<script>
import {
  payChannelMixin,
  depositMixin,
  expertArrMixin
} from 'common/js/mixin.js'
import querystring from 'querystring'
export default {
  mixins: [payChannelMixin, depositMixin, expertArrMixin],
  data() {
    return {
      visible: false,
      qrcode: null,
      orderData: this.$store.state.orderPay,
      payMode: '',
      deviceId: ''
    }
  },
  created() {
    this.deviceId = this.$store.state.batchInfo.deviceId
  },
  methods: {
    init() {
      const ws = new WebSocket(
        'ws://121.196.217.247:9000/websocket/' + this.orderData.orderNumber
      )
      const that = this
      ws.onopen = function() {
        console.log('successs')
        ws.send(that.orderData.orderNumber)
      }
      ws.onerror = function(event) {
        console.log('fail')
      }
      ws.onmessage = function(event) {
        const data = JSON.parse(event.data)
        console.log(data)
        // 处理数据
        if (data.success) {
          that.$router.push('/home/commonview/pay-success')
        }
      }
    },
    returnBatch() {
      this.$router.push(`/home/commonview/device-detail/${this.deviceId}`)
    },
    paySubmit() {
      if (!this.orderData.orderNumber) {
        this.$message.error('订单不存在请重新生成订单！')
        return
      }
      const param = {
        'order_number': this.orderData.orderNumber,
        'way': this.payMode
      }
      const url = 'http://pay.weifactory.vastsum.net/pay'
      if (this.payMode === 'wechat') {
        this.init()
        this.visible = true
        this.$jsonp(url, param)
          .then(res => {
            console.log(res)
            $('#qrcode').empty()
            $('#qrcode').qrcode(res)
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        this.$confirm('', '订单支付确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'box-confim',
          cancelButtonClass: 'box-cancel',
          type: 'warning',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          center: true,
          roundButton: true,
          showClose: false
        })
          .then(() => {
            this.returnBatch()
          })
          .catch(() => {
            this.returnBatch()
          })
        window.open(url + '?' + querystring.stringify(param))
      }
    }
  }
}
</script>
<style scoped>
</style>
