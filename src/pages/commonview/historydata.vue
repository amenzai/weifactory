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
    <el-table :data="table.data" border style="width: 100%" ref="multipleTable">
      <el-table-column label="日期">
        <template scope="scope">{{ scope.row.gmtCreate | dateFilter}}</template>
      </el-table-column>
      <el-table-column label="温度">
        <template scope="scope">{{ scope.row.sensorTemperature1 | temperature}}</template>
      </el-table-column>
      <el-table-column label="湿度">
        <template scope="scope">{{ scope.row.sensorHumidity1 | humidity}}</template>
      </el-table-column>
      <el-table-column label="光照时间">
        <template scope="scope">{{ scope.row.sensorIllumination1}}</template>
      </el-table-column>
      <!-- <el-table-column label="蔬菜种类">
        <template scope="scope">{{ scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="栽培模式">
        <template scope="scope">{{ scope.row.name}}</template>
      </el-table-column> -->
      <el-table-column label="图片">
        <template scope="scope">
          <el-button type="text" @click="viewPic(scope.row.imgPath1)">查看图片</el-button>
        </template>
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
        table: {
          data: [],
          send: {
            page: 1,
            pageSize: this.$CONSTANT.PAGE_SIZE,
            deviceId: this.$route.query.id
              // startTime: '',
              // endTime: ''
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
      this.drawChartLineA()
      this.drawChartLineB() 
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
            this.table.page = res.data.firstPage;
            this.table.totalCount = res.data.total;
            this.table.totalPages = res.data.pages;
          })
      },
      getChartData() {
        // var num = 0
        // var timer = null
        // timer = setInterval(() => {
          var date = new Date()
          // if (num >= 5) {
          //   this.optionA.series[0].data.shift()
          //   this.optionA.xAxis.data.shift()
          //   this.optionB.series[0].data.shift()
          //   this.optionB.xAxis.data.shift()
          // }
          this.$ajax.get('history/sensor/temperature', this.table.send.deviceId)
            .then(res => {
              console.log('', res);
              this.optionA.series[0].name = res.data.name
              this.optionA.series[0].data.push(res.data.data)
              this.optionA.xAxis.data.push(this.$dateFilter(date, 'mm:ss'))
              this.drawChartLineA()
            })
          this.$ajax.get('history/sensor/humidity', this.table.send.deviceId)
            .then(res => {
              console.log('', res);
              this.optionB.series[0].name = res.data.name
              this.optionB.series[0].data.push(res.data.data)
              this.optionB.xAxis.data.push(this.$dateFilter(date, 'mm:ss'))
              this.drawChartLineB()
            })
            // num++
        // }, 1000)
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
    }
}
</script>
<style scoped>
</style>
