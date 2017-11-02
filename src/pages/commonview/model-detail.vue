<template>
  <el-row>
    <el-col :span="14" :offset="2">
      <el-form ref="submitForm" label-width="120px">
        <el-form-item label="模型名称：">{{ modelDetail.modelName }}</el-form-item>
        <el-form-item label="最高温度：">{{ modelDetail.temperatureUp }}</el-form-item>
        <el-form-item label="最低温度：">{{ modelDetail.temperatureDown }}</el-form-item>
      </el-form>
    </el-col>
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
      this.$ajax.get('model/detail',this.modelId)
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
