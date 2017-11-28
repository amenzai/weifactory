<template>
  <el-row>
    <el-form :inline="true" ref="form" :model="table.send">
      <el-form-item label="采集日期：">
        <el-date-picker v-model="date" type="datetimerange" placeholder="选择日期时间范围">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="table.data" border ref="multipleTable">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="二氧化碳浓度：">{{ props.row.sensorCo2}}</el-form-item>
            <el-form-item label="氧气浓度：">{{ props.row.sensorOxygen }}</el-form-item>
            <el-form-item label="PH值：">{{ props.row.sensorPh}}</el-form-item>
            <el-form-item label="EC值：">{{ props.row.sensorEc}}</el-form-item>
            <el-form-item label="培养液温度：">{{ props.row.sensorNutrientSolution }}</el-form-item>
            <el-form-item label="室外温度：">{{ props.row.outdoorTemperature}}</el-form-item>
            <el-form-item label="高液位：">{{ props.row.sensorHighLevel}}</el-form-item>
            <el-form-item label="低液位：">{{ props.row.sensorLowLevel}}</el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="84">
        <template scope="scope">{{ scope.row.gmtCreate | dateFilter('yyyy-MM-dd')}}</template>
      </el-table-column>
      <el-table-column label="温度第一层" width="80">
        <template scope="scope">{{ scope.row.sensorTemperature1 | temperature}}</template>
      </el-table-column>
      <el-table-column label="温度第二层" width="80">
        <template scope="scope">{{ scope.row.sensorTemperature2 | temperature}}</template>
      </el-table-column>
      <el-table-column label="温度第三层" width="80">
        <template scope="scope">{{ scope.row.sensorTemperature3 | temperature}}</template>
      </el-table-column>
      <el-table-column label="湿度第一层" width="80">
        <template scope="scope">{{ scope.row.sensorHumidity1 | humidity}}</template>
      </el-table-column>
      <el-table-column label="湿度第二层" width="80">
        <template scope="scope">{{ scope.row.sensorHumidity2 | humidity}}</template>
      </el-table-column>
      <el-table-column label="湿度第三层" width="80">
        <template scope="scope">{{ scope.row.sensorHumidity3 | humidity}}</template>
      </el-table-column>
      <el-table-column label="光照强度第一层">
        <template scope="scope">{{ scope.row.sensorIllumination1}}</template>
      </el-table-column>
      <el-table-column label="光照强度第二层">
        <template scope="scope">{{ scope.row.sensorIllumination2}}</template>
      </el-table-column>
      <el-table-column label="光照强度第三层">
        <template scope="scope">{{ scope.row.sensorIllumination3}}</template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col>
        <div class="fl-r mt10">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.page" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-row class="mt10">
      <el-col :span="12">
        <div id="myChartA" style="width: 100%;height: 400px"></div>
      </el-col>
      <el-col :span="12">
        <div id="myChartB" style="width: 100%;height: 400px"></div>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
export default {
  data() {
      return {
        date: [],
        chartLineA: null,
        chartLineB: null,
        timer: null,
        table: {
          data: [],
          send: {
            page: 1,
            pageSize: this.$CONSTANT.PAGE_SIZE,
            deviceId: this.$route.query.id,
            startTime: '',
            endTime: ''
          },
          totalCount: 0,
          totalPages: 0,
          pageSelect: this.$CONSTANT.PAGE_SELECT
        },
        optionA: {},
        optionB: {}
      }
    },
    created() {
      this.init()
      this.getList()
      this.getChartData()
    },
    updated() {
      this.drawChartLineA()
      this.drawChartLineB()
    },
    methods: {
      init() {
        this.optionA = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '',
            type: 'line',
            stack: '总量',
            data: []
          }]
        }
        this.optionB = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '',
            type: 'line',
            stack: '总量',
            data: []
          }]
        }
      },
      drawChartLineA() {
        this.chartLineA = this.$echarts.init(document.getElementById('myChartA'))
        this.chartLineA.setOption(this.optionA)
      },
      drawChartLineB() {
        this.chartLineB = this.$echarts.init(document.getElementById('myChartB'))
        this.chartLineB.setOption(this.optionB)
      },
      getList() {
        this.$ajax.post('history/sensor', this.table.send)
          .then(res => {
            console.log('', res);
            this.table.data = res.data.list;
            this.table.totalCount = res.data.total;
            this.table.totalPages = res.data.pages;
          })
        var date = new Date()
        this.$ajax.get('history/sensor/temperature', this.table.send.deviceId)
          .then(res => {
            console.log('', res);
            this.optionA.series[0].name = res.data.name
            this.optionA.series[0].data.push(res.data.data)
            this.optionA.xAxis.data.push(this.$dateFilter(date, 'hh:mm:ss'))
            this.drawChartLineA()
          })
        this.$ajax.get('history/sensor/humidity', this.table.send.deviceId)
          .then(res => {
            console.log('', res);
            this.optionB.series[0].name = res.data.name
            this.optionB.series[0].data.push(res.data.data)
            this.optionB.xAxis.data.push(this.$dateFilter(date, 'hh:mm:ss'))
            this.drawChartLineB()
          })
      },
      getChartData() {
        var num = 1
        this.timer = null
        this.timer = setInterval(() => {
          var date = new Date()
          if (num >= 5) {
            this.optionA.series[0].data.splice(0, 1)
            this.optionA.xAxis.data.splice(0, 1)
            this.optionB.series[0].data.splice(0, 1)
            this.optionB.xAxis.data.splice(0, 1)
          }
          this.$ajax.get('history/sensor/temperature', this.table.send.deviceId)
            .then(res => {
              console.log('', res);
              this.optionA.series[0].name = res.data.name
              this.optionA.series[0].data.push(res.data.data)
              this.optionA.xAxis.data.push(this.$dateFilter(date, 'hh:mm:ss'))
              this.drawChartLineA()
            })
          this.$ajax.get('history/sensor/humidity', this.table.send.deviceId)
            .then(res => {
              console.log('', res);
              this.optionB.series[0].name = res.data.name
              this.optionB.series[0].data.push(res.data.data)
              this.optionB.xAxis.data.push(this.$dateFilter(date, 'hh:mm:ss'))
              this.drawChartLineB()
            })
          num++
        }, 2000)
      },
      handleSizeChange(val) {
        this.table.send.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.table.send.page = val;
        this.getList();
      },
      searchList() {
        if (this.date && this.date.length) { // 日期的处理
          this.table.send.startTime = this.$dateFilter(this.date[0], 'yyyy-MM-dd hh:mm:ss');
          this.table.send.endTime = this.$dateFilter(this.date[1], 'yyyy-MM-dd hh:mm:ss');
        } else {
          this.table.send.startTime = '';
          this.table.send.endTime = '';
        }
        this.getList();
      },
      viewPic(url) {
        window.open(url)
      }
    },
    destroyed() {
      clearInterval(this.timer)
    }
}
</script>
<style scoped>
  .el-form--inline .el-form-item {
    margin-right: 30px;
  }
  .el-form-item__label {
    padding-right: 4px;
  }
</style>
