<template>
  <el-row>
    <p class="ta-r">
      <el-button>
        <router-link :to="{ path: '/home/commonview/device-detail/' + batchInfo.deviceId}">&lt;&lt;返回批次信息页</router-link>
      </el-button>
    </p>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="第一层" name="first">
        <ul class="list-item">
          <li>
            <span>温度/℃：</span>
            <el-input-number v-model="data.wd1" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </li>
          <li>
           <el-checkbox v-model="data.kqxh1" label="空气循环" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.kqxd1" label="空气消毒" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.hxf1" label="换新风" border true-label="1" false-label="0"></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="data.syyy1" label="施营养液" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.pyyy1" label="排营养液" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.yyyxd1" label="营养液消毒" border true-label="1" false-label="0"></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="data.led11" label="LED1" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.led12" label="LED2" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.led13" label="LED3" border true-label="1" false-label="0"></el-checkbox>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="第二层" name="second">
        <ul class="list-item">
          <li>
            <span>温度/℃：</span>
            <el-input-number v-model="data.wd2" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </li>
          <li>
           <el-checkbox v-model="data.kqxh2" label="空气循环" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.kqxd2" label="空气消毒" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.hxf2" label="换新风" border true-label="1" false-label="0"></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="data.syyy2" label="施营养液" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.pyyy2" label="排营养液" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.yyyxd2" label="营养液消毒" border true-label="1" false-label="0"></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="data.led21" label="LED1" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.led22" label="LED2" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.led23" label="LED3" border true-label="1" false-label="0"></el-checkbox>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="第三层" name="thild">
        <ul class="list-item">
          <li>
            <span>温度/℃：</span>
            <el-input-number v-model="data.wd3" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </li>
          <li>
           <el-checkbox v-model="data.kqxh3" label="空气循环" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.kqxd3" label="空气消毒" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.hxf3" label="换新风" border true-label="1" false-label="0"></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="data.syyy3" label="施营养液" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.pyyy3" label="排营养液" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.yyyxd3" label="营养液消毒" border true-label="1" false-label="0"></el-checkbox>
          </li>
          <li>
           <el-checkbox v-model="data.led31" label="LED1" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.led32" label="LED2" border true-label="1" false-label="0"></el-checkbox>
           <el-checkbox v-model="data.led33" label="LED3" border true-label="1" false-label="0"></el-checkbox>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="育苗室" name="four">
        <p class="miao-btn">
          <el-checkbox v-model="data.ymbg" label="育苗补光" border true-label="1" false-label="0"></el-checkbox>
         <el-checkbox v-model="data.mpjs" label="苗盘浇水" border true-label="1" false-label="0"></el-checkbox>
        </p>
      </el-tab-pane>
    </el-tabs>
    <p class="submit-btn ta-c">
      <el-button type="primary" @click="submit">下达控制指令</el-button>
      <el-button @click="reset">取消</el-button>
    </p>
    <div class="bottom-info ta-c">
      <control-btn :trust-status="batchInfo.trustStatus"></control-btn>
    </div>
  </el-row>
</template>
<script>
import ControlBtn from '../components/control-btn.vue'
export default {
  components: {
    ControlBtn
  },
  data() {
    return {
      activeName: "first",
      batchInfo: {},
      data: {}
    };
  },
  created() {
    this.batchInfo = this.$store.state.batchInfo;
    this.getParamInfo()
  },
  methods: {
    init() {
      this.data = {
        wd1: undefined,
        kqxh1: '0',
        kqxd1: '0',
        hxf1: '0',
        syyy1: '0',
        pyyy1: '0',
        yyyxd1: '0',
        led11: '0',
        led12: '0',
        led13: '0',
        wd2: undefined,
        kqxh2: '0',
        kqxd2: '0',
        hxf2: '0',
        syyy2: '0',
        pyyy2: '0',
        yyyxd2: '0',
        led21: '0',
        led22: '0',
        led23: '0',
        wd3: undefined,
        kqxh3: '0',
        kqxd3: '0',
        hxf3: '0',
        syyy3: '0',
        pyyy3: '0',
        yyyxd3: '0',
        led31: '0',
        led32: '0',
        led33: '0',
        ymbg: '0',
        mpjs: '0'
      };
    },
    getParamInfo() {
      this.$ajax.get("hand", this.batchInfo.batchId).then(res => {
        if (res.data === null) {
          this.init();
        } else {
          this.data = {
            handControlId: res.data.handControlId,
            wd1: res.data.wd1,
            kqxh1: res.data.kqxh1,
            kqxd1: res.data.kqxd1,
            hxf1: res.data.hxf1,
            syyy1: res.data.syyy1,
            pyyy1: res.data.pyyy1,
            yyyxd1: res.data.yyyxd1,
            led11: res.data.led11,
            led12: res.data.led12,
            led13: res.data.led13,
            wd2: res.data.wd2,
            kqxh2: res.data.kqxh2,
            kqxd2: res.data.kqxd2,
            hxf2: res.data.hxf2,
            syyy2: res.data.syyy2,
            pyyy2: res.data.pyyy2,
            yyyxd2: res.data.yyyxd2,
            led21: res.data.led21,
            led22: res.data.led22,
            led23: res.data.led23,
            wd3: res.data.wd3,
            kqxh3: res.data.kqxh3,
            kqxd3: res.data.kqxd3,
            hxf3: res.data.hxf3,
            syyy3: res.data.syyy3,
            pyyy3: res.data.pyyy3,
            yyyxd3: res.data.yyyxd3,
            led31: res.data.led31,
            led32: res.data.led32,
            led33: res.data.led33,
            ymbg: res.data.ymbg,
            mpjs: res.data.mpjs
          };
        }
      });
    },
    submit() {
      const send = JSON.parse(JSON.stringify(this.data));
      send.batchId = this.batchInfo.batchId;
      this.$ajax.post("hand/saveOrUpdate", send).then(res => {
        this.$message.success(res.message);
        this.getParamInfo();
      });
    },
    reset() {
      this.getParamInfo();
    }
  }
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
