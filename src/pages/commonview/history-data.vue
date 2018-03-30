<template>
  <el-row>
    <p class="ta-r">
      <el-button>
        <router-link :to="{ path: '/home/commonview/device-detail/' + batchInfo.deviceId}">&lt;&lt;返回批次信息页</router-link>
      </el-button>
    </p>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="第一层" name="first">
        
      </el-tab-pane>
      <el-tab-pane label="第二层" name="second">
        
      </el-tab-pane>
      <el-tab-pane label="第三层" name="thild">
      </el-tab-pane>
      <el-tab-pane label="生长图片" name="four">
      </el-tab-pane>
    </el-tabs>
    <el-form :inline="true" ref="form">
      <el-form-item label="采集日期：" v-show="current !== '3'">
        <el-date-picker v-model="date" type="daterange" placeholder="选择日期时间范围">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="采集日期：" v-show="current === '3'">
        <el-date-picker v-model="date2" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="类型：" v-show="current === '0'">
        <el-select clearable v-model="type" placeholder="请选择" @change="changeType">
          <el-option label="LED1" value="14"></el-option>
          <el-option label="LED2" value="15"></el-option>
          <el-option label="LED3" value="16"></el-option>
          <el-option label="温度" value="11"></el-option>
          <el-option label="湿度" value="12"></el-option>
          <el-option label="营养液" value="13"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" v-show="current === '1'">
        <el-select clearable v-model="type" placeholder="请选择" @change="changeType">
          <el-option label="LED1" value="24"></el-option>
          <el-option label="LED2" value="25"></el-option>
          <el-option label="LED3" value="26"></el-option>
          <el-option label="温度" value="21"></el-option>
          <el-option label="湿度" value="22"></el-option>
          <el-option label="营养液" value="23"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：" v-show="current === '2'">
        <el-select clearable v-model="type" placeholder="请选择" @change="changeType">
          <el-option label="LED1" value="34"></el-option>
          <el-option label="LED2" value="35"></el-option>
          <el-option label="LED3" value="36"></el-option>
          <el-option label="温度" value="31"></el-option>
          <el-option label="湿度" value="32"></el-option>
          <el-option label="营养液" value="33"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="current !== '3'">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item v-show="current === '3'">
        <el-button type="primary" @click="search2">搜索</el-button>
      </el-form-item>
    </el-form>
    <div id="myChart" style="width: 100%;height: 400px" v-show="current !== '3'"></div>
    <div style="width: 600px;" v-show="current === '3'">
      <img :src="imgUrl" alt="点击搜索查看图片" style="width: 100%">
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      chartLine: null,
      imgUrl: '',
      option: {},
      current: "0",
      batchInfo: {},
      date: [],
      date2: '',
      type: "",
      send: {
        startTime: "",
        endTime: "",
        type: "",
        batchId: ""
      },
      activeName: "first"
    };
  },
  created() {
    this.batchInfo = this.$store.state.batchInfo;
    this.send.batchId = this.batchInfo.batchId;
  },
  mounted() {
    this.init();
    this.drawChartLine();
  },
  // updated() {
  //   this.drawChartLine();
  // },
  methods: {
    init() {
      this.option = {
        title: {
          x: 'center',
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "温度",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            data: []
          }
        ]
      };
    },
    drawChartLine() {
      this.chartLine = this.$echarts.init(document.getElementById("myChart"));
      this.chartLine.setOption(this.option);
    },
    changeType(val) {
      const arr1 = ['14', '15', '16', '24', '25', '26', '34', '35', '36']
      const arr2 = ['11', '21', '31']
      const arr3 = ['12', '22', '32']
      const arr4 = ['13', '23', '33']
      if (arr1.indexOf(val) !== -1) {
        this.option.title.text = 'LED开关脉冲图（开：1，关：0）'
        this.option.series[0].step = "start";
      } else if (arr2.indexOf(val) !== -1) {
        this.option.title.text = '温度时间折线图（温度/℃）'
        this.option.series[0].step = ''
      } else if (arr3.indexOf(val) !== -1) {
        this.option.title.text = '湿度时间折线图（湿度RH%）'
        this.option.series[0].step = ''
      } else if (arr4.indexOf(val) !== -1) {
        this.option.title.text = '营养液脉冲图'
        this.option.series[0].step = "start";
      }
      console.log(this.option.series[0])
    },
    search() {
      if (this.date && this.date.length) {
        this.send.startTime = this.$dateFilter(this.date[0]);
        this.send.endTime = this.$dateFilter(this.date[1]);
      } else {
        this.send.startTime = "";
        this.send.endTime = "";
      }
      this.send.type = this.type;
      this.$ajax.post("history/data", this.send).then(res => {
        this.option.series[0].data = res.data.y;
        this.option.xAxis.data = res.data.x.map(item =>
          this.$dateFilter(item, "yyyy-MM-dd hh:mm")
        );
        this.drawChartLine();
      });
    },
    search2() {
      if (this.date2) {
        this.date2 = this.$dateFilter(this.date2)
      } else {
        this.date2 = ''
      }
      const send = {
        batchId: this.batchInfo.batchId,
        startTime: this.date2
      }
      this.$ajax.post("history/image", send).then(res => {
        if (res.data === null) {
          this.$message.warning('暂无图片信息')
          return
        }
        this.imgUrl = res.data
      });
    },
    handleClick(tab, event) {
      console.log(tab.index);
      this.current = tab.index;
      this.date = [];
      this.type = "";
      this.init();
      this.drawChartLine();
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped lang="less">
.echarts {
  width: 600px;
  height: 600px;
  background-color: #333;
}
</style>
