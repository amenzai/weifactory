<template>
  <el-row>
    <el-col :span="14" :offset="2">
      <el-form ref="submitForm" :model="form" label-width="120px" :rules="form.rules">
        <el-form-item label="设备序列号：">{{ resData.sn }}</el-form-item>
        <el-form-item label="第一层蔬菜名称">{{ resData.plantOne }}</el-form-item>
        <el-form-item label="第二层蔬菜名称">{{ resData.plantTwo }}</el-form-item>
        <el-form-item label="第三层蔬菜名称">{{ resData.plantThree }}</el-form-item>
        <el-form-item label="选择托管方式：" prop="deposit">
          <el-select clearable placeholder="请选择" v-model="form.deposit">
            <el-option label="全托管方式" value="1"></el-option>
            <el-option label="自定义托管方式" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择托管专家：" prop="exportId">
          <el-select clearable placeholder="请选择" v-model="form.exportId">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in expertArr" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用：">{{ resData.cost }}</el-form-item>
        <el-form-item class="ta-c">
          <el-button type="primary" @click="submit('submitForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      deviceId: this.$route.query.id || '',
      batchId: '',
      expertArr: [],
      resData: {},
      form: {
        deposit: '',
        exportId: '',
        rules: {
          deposit: [{
            required: true,
            message: '请选择托管方式'
          }],
          exportId: [{
            required: true,
            message: '请选择专家'
          }]
        }
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$ajax.get('order/device', this.deviceId)
        .then(res => {
          console.log('', res);
          this.resData = res.data;
          this.expertArr = this.resData.exports.map(item => {
            return {
              label: item.userName,
              value: item.userId
            }
          })
          console.log(this.expertArr)
        })
    },
    submit(formName) {
      this.form.exportId = this.form.exportId.toString()
      let valid = false;
      this.$refs[formName].validate((v) => {
        valid = v
      });
      if (!valid) {
        return false;
      }
      const send = {
        sn: this.resData.sn,
        batchId: this.resData.batchId,
        deposit: this.form.deposit,
        exportId: this.form.exportId
      }
      this.$ajax.post('order/pay', send)
        .then(res => {
          console.log('', res);
          var type = res.success ? 'success' : 'error';
          if (type === 'success') {
            this.$store.commit('UPDATE_ORDER', res.data);
            this.$router.push('/home/user/order-payment')
          }
          this.$message({
            message: res.message,
            type: type
          });
        })
    },
    checkValue(val) {
      this.form.deposit = val.toString()
    }
  }
}
</script>
<style scoped>
  
</style>
