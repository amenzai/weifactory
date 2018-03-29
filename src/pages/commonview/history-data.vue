<template>
  <el-row>
    <p class="ta-r">
      <el-button>
        <router-link :to="{ path: '/home/commonview/device-detail/' + batchInfo.deviceId}">&lt;&lt;返回批次信息页</router-link>
      </el-button>
    </p>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="第一层" name="first">
        <p class="light">
          <i class="el-icon-my-light-fill"></i>
          <i class="el-icon-my-light-fill"></i>
          <i class="el-icon-my-light-fill"></i>
        </p>
        <p class="light-text"><span>LED1</span><span>LED2</span><span>LED3</span></p>
        <el-form :inline="true" ref="form" :model="demo">
          <el-form-item label="采集日期：">
            <el-date-picker v-model="date" type="daterange" placeholder="选择日期时间范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select clearable v-model="exceptionType" placeholder="请选择">
              <el-option label="温度" value="1"></el-option>
              <el-option label="湿度" value="1"></el-option>
              <el-option label="营养液" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="echarts">
          
        </div>
      </el-tab-pane>
      <el-tab-pane label="第二层" name="second">
        <p class="light">
          <i class="el-icon-my-light-fill"></i>
          <i class="el-icon-my-light-fill"></i>
          <i class="el-icon-my-light-fill"></i>
        </p>
        <p class="light-text"><span>LED1</span><span>LED2</span><span>LED3</span></p>
        <el-form :inline="true" ref="form" :model="demo">
          <el-form-item label="采集日期：">
            <el-date-picker v-model="date" type="daterange" placeholder="选择日期时间范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select clearable v-model="exceptionType" placeholder="请选择">
              <el-option label="温度" value="1"></el-option>
              <el-option label="湿度" value="1"></el-option>
              <el-option label="营养液" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="echarts">
          
        </div>
      </el-tab-pane>
      <el-tab-pane label="第三层" name="thild">
        <p class="light">
          <i class="el-icon-my-light-fill"></i>
          <i class="el-icon-my-light-fill"></i>
          <i class="el-icon-my-light-fill"></i>
        </p>
        <p class="light-text"><span>LED1</span><span>LED2</span><span>LED3</span></p>
        <el-form :inline="true" ref="form" :model="demo">
          <el-form-item label="采集日期：">
            <el-date-picker v-model="date" type="daterange" placeholder="选择日期时间范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select clearable v-model="exceptionType" placeholder="请选择">
              <el-option label="温度" value="1"></el-option>
              <el-option label="湿度" value="1"></el-option>
              <el-option label="营养液" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="echarts">
          
        </div>
      </el-tab-pane>
      <el-tab-pane label="生长图片" name="four">
        <el-form :inline="true" ref="form" :model="demo">
          <el-form-item label="查询日期：">
            <el-date-picker v-model="date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查找</el-button>
          </el-form-item>
        </el-form>
        <div class="echarts">
          
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      batchInfo: {},
      activeName: 'first'
    }
  },
  created() {
    this.batchInfo = this.$store.state.batchInfo;
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped lang="less">
.light {
  padding-left: 30px;
  font-size: 30px;
  i + i {
    margin-left: 20px;
  }
}
.light-text {
  font-size: 14px;
  padding-left: 30px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  span + span {
    margin-left: 24px;
  }
}
.echarts {
  width: 600px;
  height: 600px;
  background-color: #333;
}
</style>
