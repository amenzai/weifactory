<template>
  <el-row>
    <p class="ta-r">
      <el-button>
        <router-link :to="{ path: '/home/commonview/device-detail/' + batchInfo.deviceId}">&lt;&lt;返回批次信息页</router-link>
      </el-button>
    </p>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="第一层" name="first">
        <el-form ref="formName" :model="formData" label-width="170px" :inline="true">
          <el-form-item label="当前批次：">{{ batchInfo.batchId }}</el-form-item>
          <el-form-item label="蔬菜名称：">{{ batchInfo.plantOne }}</el-form-item>
          <el-form-item label="生长模式：">{{ batchInfo.cultModelOne | seeLabel(cultModel)}}</el-form-item>
          <h3>补光灯：</h3>
          <div>
            <el-form-item label="白天补光时长/分钟：">
              <el-input-number v-model="formData.dayBgLenght1" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="白天补光间隔/分钟：">
              <el-input-number v-model="formData.dayBgCycle1" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上补光时长/分钟：">
              <el-input-number v-model="formData.nightBgLenght1" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="晚上补光间隔/分钟：">
              <el-input-number v-model="formData.nightBgCycle1" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
          <h3>营养液：</h3>
          <div>
            <el-form-item label="白天营养液循环时长/分钟：">
            <el-input-number v-model="formData.dayYyLength1" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天营养液循环间隔/分钟：">
            <el-input-number v-model="formData.dayYyCycle1" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上营养液循环时长/分钟：">
            <el-input-number v-model="formData.nightYyLength1" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上营养液循环间隔/分钟：">
            <el-input-number v-model="formData.nightYyCycle1" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="第二层" name="second">
        <el-form ref="formName" :model="formData" label-width="170px" :inline="true">
          <el-form-item label="当前批次：">{{ batchInfo.batchId }}</el-form-item>
          <el-form-item label="蔬菜名称：">{{ batchInfo.plantTwo }}</el-form-item>
          <el-form-item label="生长模式：">{{ batchInfo.cultModelTwo | seeLabel(cultModel)}}</el-form-item>
          <h3>补光灯：</h3>
          <div>
            <el-form-item label="白天补光时长/分钟：">
            <el-input-number v-model="formData.dayBgLenght2" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天补光间隔/分钟：">
            <el-input-number v-model="formData.dayBgCycle2" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上补光时长/分钟：">
            <el-input-number v-model="formData.nightBgLenght2" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光间隔/分钟：">
            <el-input-number v-model="formData.nightBgCycle2" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <h3>营养液：</h3>
          <div>
            <el-form-item label="白天营养液循环时长/分钟：">
            <el-input-number v-model="formData.dayYyLength2" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天营养液循环间隔/分钟：">
            <el-input-number v-model="formData.dayYyCycle2" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上营养液循环时长/分钟：">
            <el-input-number v-model="formData.nightYyLength2" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上营养液循环间隔/分钟：">
            <el-input-number v-model="formData.nightYyCycle2" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="第三层" name="third">
        <el-form ref="formName" :model="formData" label-width="170px" :inline="true">
          <el-form-item label="当前批次：">{{ batchInfo.batchId }}</el-form-item>
          <el-form-item label="蔬菜名称：">{{ batchInfo.plantThree }}</el-form-item>
          <el-form-item label="生长模式：">{{ batchInfo.cultModelThree | seeLabel(cultModel)}}</el-form-item>
          <h3>补光灯：</h3>
          <div>
            <el-form-item label="白天补光时长/分钟：">
            <el-input-number v-model="formData.dayBgLenght3" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天补光间隔/分钟：">
            <el-input-number v-model="formData.dayBgCycle3" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上补光时长/分钟：">
            <el-input-number v-model="formData.nightBgLenght3" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光间隔/分钟：">
            <el-input-number v-model="formData.nightBgCycle3" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <h3>营养液：</h3>
          <div>
            <el-form-item label="白天营养液循环时长/分钟：">
            <el-input-number v-model="formData.dayYyLength3" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天营养液循环间隔/分钟：">
            <el-input-number v-model="formData.dayYyCycle3" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上营养液循环时长/分钟：">
            <el-input-number v-model="formData.nightYyLength3" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上营养液循环间隔/分钟：">
            <el-input-number v-model="formData.nightYyCycle3" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="育苗室" name="four">
        <el-form ref="formName" :model="formData" label-width="170px" :inline="true">
          <el-form-item label="蔬菜名称：" label-width="120px">{{ batchInfo.seedRoomPlant || '暂无' }}</el-form-item>
          <el-form-item label="播种日期：" label-width="120px">
            <span v-if="batchInfo.seedPlantingTime">{{ batchInfo.seedPlantingTime | dateFilter }}</span>
            <span>暂无</span>
          </el-form-item>
          <el-form-item label="预计可移植日期：" label-width="170px">
            <span v-if="batchInfo.seedRecoveryTime">{{ batchInfo.seedRecoveryTime | dateFilter }}</span>
            <span>暂无</span>
          </el-form-item>
          <h3>育苗灯：</h3>
          <div>
            <el-form-item label="白天开启时长/分钟：">
            <el-input-number v-model="formData.dayFeedBgTime" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天补光时长/分钟：">
            <el-input-number v-model="formData.dayFeedBgLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上开启时长/分钟：">
            <el-input-number v-model="formData.nightFeedBgTime" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光时长/分钟：">
            <el-input-number v-model="formData.nightFeedBgLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <h3>喷淋阀：</h3>
          <div>
            <el-form-item label="白天开启时长/分钟：">
            <el-input-number v-model="formData.dayFeedWaterLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天补光时长/分钟：">
            <el-input-number v-model="formData.dayFeedWaterCycle" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上开启时长/分钟：">
            <el-input-number v-model="formData.nightFeedWaterLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光时长/分钟：">
            <el-input-number v-model="formData.nightFeedWaterCycle" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="整体控制" name="five">
        <el-form ref="formName" :model="formData" label-width="150px" :inline="true">
          <el-form-item label="时间设置：">
            <el-date-picker v-model="formData.daySet" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <div>
            <el-form-item label="日长/小时：">
            <el-input-number v-model="formData.dateLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="时移/小时：">
            <el-input-number v-model="formData.dateYi" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="白天温度/℃：">
            <el-input-number v-model="formData.dayTemperature" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天湿度/RH%：">
            <el-input-number v-model="formData.dayHumidity" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上温度/℃：">
            <el-input-number v-model="formData.nightTemperature" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上湿度/RH%：">
            <el-input-number v-model="formData.nightHumidity" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="白天开始时间：">
            <el-time-picker v-model="formData.dayStartTime" placeholder="任意时间点"></el-time-picker>
          </el-form-item>
          <el-form-item label="白天结束时间：">
            <el-time-picker v-model="formData.dayEndTime" placeholder="任意时间点"></el-time-picker>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上开始时间：">
            <el-time-picker v-model="formData.nightStartTime" placeholder="任意时间点"></el-time-picker>
          </el-form-item>
          <el-form-item label="晚上结束时间：">
            <el-time-picker v-model="formData.nightEndTime" placeholder="任意时间点"></el-time-picker>
          </el-form-item>
          </div>
          <h3>换新风：</h3>
          <div>
            <el-form-item label="白天换新风时长/分钟：">
            <el-input-number v-model="formData.dayNewWindLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天换新风间隔/分钟：">
            <el-input-number v-model="formData.dayNewWindTime" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上换新风时长/分钟：">
            <el-input-number v-model="formData.nightNewWindLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上换新风间隔/分钟：">
            <el-input-number v-model="formData.nightNewWindTime" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <!-- <el-col :span="24" class="ta-c mb10">
        <el-button type="primary" @click="batchSubmit('formData')">刷新</el-button>
      </el-col> -->
    </el-tabs>
    <p>
      <el-button type="primary" @click="submit('formName')">确认</el-button>
      <el-button @click="resetForm('formName')">取消</el-button>
    </p>
    <div class="bottom-info ta-c">
      <control-btn :trust-status="batchInfo.trustStatus"></control-btn>
    </div>
  </el-row>
</template>
<script>
import ControlBtn from "../components/control-btn.vue";
export default {
  components: {
    ControlBtn
  },
  data() {
    return {
      value2: "",
      batchId: "",
      batchInfo: {},
      trustStatus: "",
      cultModel: [],
      trustStatusArr: [],
      vegetableName: [],
      isShow: false,
      activeName: "first",
      formFirst: {},
      checked: {
        one: false,
        two: false,
        three: false
      },
      formData: {}
    };
  },
  created() {
    this.batchInfo = this.$store.state.batchInfo;
    this.getParamInfo();
    this.getCultModel();
  },
  methods: {
    submit(formName) {
      let valid = false;
      this.$refs[formName].validate(v => {
        valid = v;
      });
      if (!valid) {
        return false;
      }
      const send = JSON.parse(JSON.stringify(this.formData));
      send.daySet = this.$dateFilter(send.daySet);
      send.dayStartTime = this.$dateFilter(send.dayStartTime, "hh:mm:ss");
      send.dayEndTime = this.$dateFilter(send.dayEndTime, "hh:mm:ss");
      send.nightStartTime = this.$dateFilter(send.nightStartTime, "hh:mm:ss");
      send.nightEndTime = this.$dateFilter(send.nightEndTime, "hh:mm:ss");
      send.batchId = this.batchInfo.batchId;
      this.$ajax.post("paramSet/saveOrUpdate", send).then(res => {
        this.$message.success(res.message);
        this.getParamInfo();
      });
    },
    getCultModel() {
      this.$ajax.get("dict/list/controlModel").then(res => {
        this.cultModel = res.data.map(item => {
          return {
            label: item.itemName,
            value: item.itemCode
          };
        });
      });
    },
    getParamInfo() {
      this.$ajax.get("paramSet", this.batchInfo.batchId).then(res => {
        if (res.data === null) {
          this.formData = {};
        } else {
          const PREFIX = "2018/08/08 ";
          this.formData = {
            paramSetId: res.data.paramSetId,
            daySet: this.$dateFilter(res.data.daySet),
            dateLength: res.data.dateLength,
            dateYi: res.data.dateYi,
            dayTemperature: res.data.dayTemperature,
            nightTemperature: res.data.nightTemperature,
            dayHumidity: res.data.dayHumidity,
            nightHumidity: res.data.nightHumidity,
            dayStartTime: new Date(PREFIX + res.data.dayStartTime),
            dayEndTime: new Date(PREFIX + res.data.dayEndTime),
            nightStartTime: new Date(PREFIX + res.data.nightStartTime),
            nightEndTime: new Date(PREFIX + res.data.nightEndTime),
            dayNewWindLength: res.data.dayNewWindLength,
            dayNewWindTime: res.data.dayNewWindTime,
            nightNewWindLength: res.data.nightNewWindLength,
            nightNewWindTime: res.data.nightNewWindTime,
            dayBgLenght1: res.data.dayBgLenght1,
            dayBgCycle1: res.data.dayBgCycle1,
            nightBgLenght1: res.data.nightBgLenght1,
            nightBgCycle1: res.data.nightBgCycle1,
            dayYyLength1: res.data.dayYyLength1,
            dayYyCycle1: res.data.dayYyCycle1,
            nightYyLength1: res.data.nightYyLength1,
            nightYyCycle1: res.data.nightYyCycle1,
            dayBgLenght2: res.data.dayBgLenght2,
            dayBgCycle2: res.data.dayBgCycle2,
            nightBgLenght2: res.data.nightBgLenght2,
            nightBgCycle2: res.data.nightBgCycle2,
            dayYyLength2: res.data.dayYyLength2,
            dayYyCycle2: res.data.dayYyCycle2,
            nightYyLength2: res.data.nightYyLength2,
            nightYyCycle2: res.data.nightYyCycle2,
            dayBgLenght3: res.data.dayBgLenght3,
            dayBgCycle3: res.data.dayBgCycle3,
            nightBgLenght3: res.data.nightBgLenght3,
            nightBgCycle3: res.data.nightBgCycle3,
            dayYyLength3: res.data.dayYyLength3,
            dayYyCycle3: res.data.dayYyCycle3,
            nightYyLength3: res.data.nightYyLength3,
            nightYyCycle3: res.data.nightYyCycle3,
            dayFeedBgTime: res.data.dayFeedBgTime,
            dayFeedBgLength: res.data.dayFeedBgLength,
            nightFeedBgTime: res.data.nightFeedBgTime,
            nightFeedBgLength: res.data.nightFeedBgLength,
            dayFeedWaterLength: res.data.dayFeedWaterLength,
            dayFeedWaterCycle: res.data.dayFeedWaterCycle,
            nightFeedWaterLength: res.data.nightFeedWaterLength,
            nightFeedWaterCycle: res.data.nightFeedWaterCycle
          };
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields();
      this.getParamInfo();
    }
  }
};
</script>
<style scoped lang="less">
h3 {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 20px;
  padding-left: 10px;
}
.video-img {
  width: 100%;
  height: auto;
  display: block;
}

.bottom-info {
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.el-icon-my-light-fill {
  margin-right: 8px;
  /*margin-left: 12px;*/
  font-size: 18px;
}

.el-switch {
  margin-right: 36px;
}

.col-item-title {
  font-weight: bold;
  margin-bottom: 10px;
}
.btn-info {
  border-top: 1px solid #ebeef5;
  padding-top: 20px;
  padding-left: 30px;
  p {
    margin-bottom: 8px;
  }
  span {
    padding-left: 4px;
    display: inline-block;
    + span {
      margin-left: 40px;
    }
  }
}
</style>
