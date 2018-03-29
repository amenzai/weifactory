<template>
  <el-row>
    <p class="ta-r">
      <el-button>
        <router-link :to="{ path: '/home/commonview/device-detail/' + batchInfo.deviceId}">&lt;&lt;返回批次信息页</router-link>
      </el-button>
    </p>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="第一层" name="first">
        <ul class="list-item">
          <li>
            <span>温度/℃：</span>
            <el-input-number v-model="seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </li>
          <li>
           <el-checkbox v-model="checked3" label="空气循环" border></el-checkbox>
           <el-checkbox v-model="checked3" label="空气消毒" border></el-checkbox>
           <el-checkbox v-model="checked3" label="换新风" border></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="checked3" label="施营养液" border></el-checkbox>
           <el-checkbox v-model="checked3" label="排营养液" border></el-checkbox>
           <el-checkbox v-model="checked3" label="营养液消毒" border></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="checked3" label="LED1" border></el-checkbox>
           <el-checkbox v-model="checked3" label="LED2" border></el-checkbox>
           <el-checkbox v-model="checked3" label="LED3" border></el-checkbox>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="第二层" name="second">
        <ul class="list-item">
          <li>
            <span>温度/℃：</span>
            <el-input-number v-model="seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </li>
          <li>
           <el-checkbox v-model="checked3" label="空气循环" border></el-checkbox>
           <el-checkbox v-model="checked3" label="空气消毒" border></el-checkbox>
           <el-checkbox v-model="checked3" label="换新风" border></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="checked3" label="施营养液" border></el-checkbox>
           <el-checkbox v-model="checked3" label="排营养液" border></el-checkbox>
           <el-checkbox v-model="checked3" label="营养液消毒" border></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="checked3" label="LED1" border></el-checkbox>
           <el-checkbox v-model="checked3" label="LED2" border></el-checkbox>
           <el-checkbox v-model="checked3" label="LED3" border></el-checkbox>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="第三层" name="thild">
        <ul class="list-item">
          <li>
            <span>温度/℃：</span>
            <el-input-number v-model="seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </li>
          <li>
           <el-checkbox v-model="checked3" label="空气循环" border></el-checkbox>
           <el-checkbox v-model="checked3" label="空气消毒" border></el-checkbox>
           <el-checkbox v-model="checked3" label="换新风" border></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="checked3" label="施营养液" border></el-checkbox>
           <el-checkbox v-model="checked3" label="排营养液" border></el-checkbox>
           <el-checkbox v-model="checked3" label="营养液消毒" border></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="checked3" label="LED1" border></el-checkbox>
           <el-checkbox v-model="checked3" label="LED2" border></el-checkbox>
           <el-checkbox v-model="checked3" label="LED3" border></el-checkbox>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="育苗室" name="four">
        <p class="miao-btn">
          <el-checkbox v-model="checked3" label="育苗补光" border></el-checkbox>
         <el-checkbox v-model="checked3" label="苗盘浇水" border></el-checkbox>
        </p>
      </el-tab-pane>
    </el-tabs>
    <p class="submit-btn ta-c">
      <el-button type="primary">下达控制指令</el-button>
      <el-button>取消</el-button>
    </p>
    <div class="bottom-info ta-c">
      <el-button>
        <router-link :to="{ path: '/home/commonview/historydata',query:{id:batchInfo.batchId}}">查询历史数据</router-link>
      </el-button>
      <el-button v-if="batchInfo.trustStatus === '0'">
        <router-link :to="{ path: '/home/commonview/apply-manage',query:{id:batchInfo.batchId}}">申请专家托管</router-link>
      </el-button>
      <el-button v-if="batchInfo.trustStatus === '0'">申请服务器托管</el-button>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      batchInfo: {}
    }
  },
  created() {
    this.batchInfo = this.$store.state.batchInfo;
  },
  methods: {}
};
</script>
<style scoped lang="less">
.list-item {
  margin-left: 20px;
  margin-right: 20px;
}
.list-item li {
  padding: 15px 20px;
  line-height: 28px;
  border-bottom: 1px solid #ebeef5;
}
.bottom-info {
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}
.submit-btn {
  padding-top: 10px;
}
.miao-btn {
  padding: 50px 0 20px 20px;
}
</style>
