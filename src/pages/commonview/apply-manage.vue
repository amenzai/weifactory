<template>
  <el-row>
    <el-col :span="14" :offset="2">
      <el-form ref="submitForm" :model="form" label-width="120px" :rules="form.rules">
        <el-form-item label="设备序列号：">{{ resData.sn }}</el-form-item>
        <el-form-item label="设备规格：">{{ resData.deviceType | seeLabel(typeDic)}}</el-form-item>
        <el-form-item label="选择托管方式：" prop="deposit">
          <el-select clearable placeholder="请选择" v-model="form.deposit" @change="changeStatus">
            <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in hostType" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="托管时间：" v-show="isShow">
          <el-date-picker v-model="date" type="daterange" placeholder="选择日期时间范围" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择托管专家：" prop="exportId">
          <el-select clearable placeholder="请选择" v-model="form.exportId">
            <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in expertArr" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="paramTitle + '：'">{{money | currency}}</el-form-item>
        <el-form-item class="ta-c">
          <el-button type="primary" @click="submit('submitForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import {
  deviceTypeMixin,
  depositMixin,
  expertArrMixin
} from 'common/js/mixin.js'
export default {
  mixins: [deviceTypeMixin, depositMixin, expertArrMixin],
  data() {
    return {
      money: '',
      paramTitle: '费用',
      deviceId: '',
      isShow: false,
      batchId: '',
      paramList: [],
      date: [],
      resData: {},
      form: {
        deposit: '',
        exportId: '',
        startTime: '',
        endTime: '',
        rules: {
          deposit: [
            {
              required: true,
              message: '请选择托管方式'
            }
          ],
          exportId: [
            {
              required: true,
              message: '请选择专家',
              trigger: 'change'
            }
          ]
        }
      },
      pickerOptions: {
        disabledDate(time) {
          // var end = new Date()
          // end.setDate(end.getDate() + 15)
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created() {
    this.batchInfo = this.$store.state.batchInfo
    this.getList()
    this.getParamList()
  },
  methods: {
    getList() {
      this.$http.get('order/device', this.batchInfo.deviceId).then(res => {
        console.log('', res)
        this.resData = res.data
      })
    },
    getParamList() {
      this.$http.get('param/listAll').then(res => {
        this.paramList = res.data
      })
    },
    submit(formName) {
      let valid = false
      this.$refs[formName].validate(v => {
        valid = v
      })
      if (!valid) {
        return false
      }
      if (this.date && this.date.length) {
        this.form.startTime = this.$dateFilter(this.date[0])
        this.form.endTime = this.$dateFilter(this.date[1])
      } else {
        this.form.startTime = ''
        this.form.endTime = ''
      }
      const send = {
        deviceId: this.batchInfo.deviceId,
        deposit: this.form.deposit,
        exportId: this.form.exportId,
        startTime: this.form.startTime,
        endTime: this.form.endTime
      }
      this.$http.post('order/pay', send).then(res => {
        var type = res.success ? 'success' : 'error'
        if (type === 'success') {
          this.$store.commit('UPDATE_ORDER', res.data)
          this.$router.push('/home/commonview/order-payment')
        }
        this.$message({
          message: res.message,
          type: type
        })
      })
    },
    changeStatus(val) {
      console.log(val)
      const length = this.paramList.length
      if (val === '1') {
        for (let i = 0; i < length; i++) {
          if (this.paramList[i].paramCode === 'allPrice') {
            this.money = this.paramList[i].paramValue
            this.paramTitle = this.paramList[i].paramName
            break
          }
        }
      }
      if (val === '2') {
        for (let i = 0; i < length; i++) {
          if (this.paramList[i].paramCode === 'price') {
            this.money = this.paramList[i].paramValue
            this.paramTitle = this.paramList[i].paramName
            break
          }
        }
        this.isShow = true
      }
    },
    checkValue(val) {
      this.form.deposit = val.toString()
    }
  }
}
</script>
<style scoped>
</style>
