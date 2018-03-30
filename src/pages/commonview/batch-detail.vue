<template>
  <el-row>
    <el-form ref="formOne" :model="batchDetail" label-width="130px" label-position="left">
      <el-col :span="8">
        <el-form-item label="第一层蔬菜名称：">{{ batchDetail.plantOne }}</el-form-item>
        <el-form-item label="第一层栽培模式：">{{ batchDetail.cultModelOne | getLabel('cultModel')}}</el-form-item>
        <el-form-item label="第一层温度/℃：">{{ batchDetail.temperatureOne }}</el-form-item>
        <el-form-item label="第一层湿度/RH%：">{{ batchDetail.humidityOne }}</el-form-item>
        <el-form-item label="第一层左边灯：">{{ batchDetail.ledOneLeft === '1' ? '开启' : '关闭'}}</el-form-item>
        <el-form-item label="第一层中间灯：">{{ batchDetail.ledOneMiddle === '1' ? '开启' : '关闭'}}</el-form-item>
        <el-form-item label="第一层右边灯：">{{ batchDetail.ledOneRight === '1' ? '开启' : '关闭'}}</el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="第二层蔬菜名称：">{{ batchDetail.plantTwo }}</el-form-item>
        <el-form-item label="第二层栽培模式：">{{ batchDetail.cultModelTwo | getLabel('cultModel')}}</el-form-item>
        <el-form-item label="第二层温度/℃：">{{ batchDetail.temperatureTwo }}</el-form-item>
        <el-form-item label="第二层湿度/RH%：">{{ batchDetail.humidityTwo }}</el-form-item>
        <el-form-item label="第二层左边灯：">{{ batchDetail.ledTwoLeft === '1' ? '开启' : '关闭'}}</el-form-item>
        <el-form-item label="第二层中间灯：">{{ batchDetail.ledTwoMiddle === '1' ? '开启' : '关闭'}}</el-form-item>
        <el-form-item label="第二层右边灯：">{{ batchDetail.ledTwoRight === '1' ? '开启' : '关闭'}}</el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="第三层蔬菜名称：">{{ batchDetail.plantThree }}</el-form-item>
        <el-form-item label="第三层栽培模式：">{{ batchDetail.cultModelThree | getLabel('cultModel')}}</el-form-item>
        <el-form-item label="第三层温度/℃：">{{ batchDetail.temperatureThree }}</el-form-item>
        <el-form-item label="第三层湿度/RH%：">{{ batchDetail.humidityThree }}</el-form-item>
        <el-form-item label="第三层左边灯：">{{ batchDetail.ledThreeLeft === '1' ? '开启' : '关闭'}}</el-form-item>
        <el-form-item label="第三层中间灯：">{{ batchDetail.ledThreeMiddle === '1' ? '开启' : '关闭'}}</el-form-item>
        <el-form-item label="第三层右边灯：">{{ batchDetail.ledThreeRight === '1' ? '开启' : '关闭'}}</el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>
<script>
export default {
  data() {
      return {
        batchId: '',
        batchDetail: {}
      }
    },
    created() {
      this.batchId = this.$route.query.id || ''
      this.getList()
    },
    methods: {
      getList() {
        this.$ajax.get('batch/detail', this.batchId)
          .then(res => {
            console.log('', this.$toJSON(res));
            this.batchDetail = res.data;
          })
      }
    }
}
</script>
<style scoped>
</style>
