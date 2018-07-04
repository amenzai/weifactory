<template>
  <el-row>
    <el-form ref="submitForm" label-width="120px">
      <el-col :span="10" :offset="2">
        <el-form-item label="模型名称：">{{ modelDetail.modelName }}</el-form-item>
        <el-form-item label="最高温度：">{{ modelDetail.temperatureUp }}</el-form-item>
        <el-form-item label="最低温度：">{{ modelDetail.temperatureDown }}</el-form-item>
        <el-form-item label="最高湿度：">{{ modelDetail.humidityUp }}</el-form-item>
        <el-form-item label="最低湿度：">{{ modelDetail.humidityDown }}</el-form-item>
        <el-form-item label="最高光照强度：">{{ modelDetail.illuminationUp }}</el-form-item>
        <el-form-item label="最低光照强度：">{{ modelDetail.illuminationDown }}</el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="二氧化碳浓度上限：">{{ modelDetail.co2Up }}</el-form-item>
        <el-form-item label="二氧化碳浓度下限：">{{ modelDetail.co2Down }}</el-form-item>
        <el-form-item label="EC值上限：">{{ modelDetail.ecUp }}</el-form-item>
        <el-form-item label="EC值下限：">{{ modelDetail.ecDown }}</el-form-item>
        <el-form-item label="PH值上限：">{{ modelDetail.phUp }}</el-form-item>
        <el-form-item label="PH值下限：">{{ modelDetail.phDown }}</el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>
<script>
export default {
  data() {
      return {
        modelId: this.$route.query.modelId,
        modelDetail: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.$http.get('model/detail', this.modelId)
          .then(res => {
            console.log('', res);
            this.modelDetail = res.data;
          })
      }
    }
}
</script>
<style scoped>
</style>
