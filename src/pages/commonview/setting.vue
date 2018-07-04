<template>
  <el-row>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="第一层" name="first">
        <el-form ref="formName" :model="formData" label-width="170px" :inline="true">
          <el-form-item label="当前批次：">{{ '1' + batchInfo.batchCreatTime }}</el-form-item>
          <el-form-item label="蔬菜名称：">{{ batchInfo.plantOne | seeLabel(vegetableName) }}</el-form-item>
          <el-form-item label="生长模式：">{{ batchInfo.cultModelOne | seeLabel(cultModel)}}</el-form-item>
          <div>
            <el-form-item label="白天温度/℃：">
              <el-input-number v-model="formData.dayTemperature1" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="白天湿度/RH%：">
              <el-input-number v-model="formData.dayHumidity1" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上温度/℃：">
              <el-input-number v-model="formData.nightTemperature1" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="晚上湿度/RH%：">
              <el-input-number v-model="formData.nightHumidity1" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
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
          <el-form-item label="当前批次：">{{ '2' + batchInfo.batchCreatTime }}</el-form-item>
          <el-form-item label="蔬菜名称：">{{ batchInfo.plantTwo | seeLabel(vegetableName) }}</el-form-item>
          <el-form-item label="生长模式：">{{ batchInfo.cultModelTwo | seeLabel(cultModel)}}</el-form-item>
          <div>
            <el-form-item label="白天温度/℃：">
              <el-input-number v-model="formData.dayTemperature2" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="白天湿度/RH%：">
              <el-input-number v-model="formData.dayHumidity2" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上温度/℃：">
              <el-input-number v-model="formData.nightTemperature2" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="晚上湿度/RH%：">
              <el-input-number v-model="formData.nightHumidity2" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
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
          <el-form-item label="当前批次：">{{ '3' + batchInfo.batchCreatTime }}</el-form-item>
          <el-form-item label="蔬菜名称：">{{ batchInfo.plantThree | seeLabel(vegetableName) }}</el-form-item>
          <el-form-item label="生长模式：">{{ batchInfo.cultModelThree | seeLabel(cultModel)}}</el-form-item>
          <div>
            <el-form-item label="白天温度/℃：">
              <el-input-number v-model="formData.dayTemperature3" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="白天湿度/RH%：">
              <el-input-number v-model="formData.dayHumidity3" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上温度/℃：">
              <el-input-number v-model="formData.nightTemperature3" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="晚上湿度/RH%：">
              <el-input-number v-model="formData.nightHumidity3" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
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
          <el-form-item label="蔬菜名称：" label-width="120px">
            <span v-if="batchInfo.seedRoomPlant">{{ batchInfo.seedRoomPlant | seeLabel(vegetableName) }}</span>
            <span v-else>-</span>
          </el-form-item>
          <el-form-item label="播种日期：" label-width="120px">
            <span v-if="batchInfo.seedPlantingTime">{{ batchInfo.seedPlantingTime | dateFilter }}</span>
            <span v-else>-</span>
          </el-form-item>
          <el-form-item label="预计可移植日期：" label-width="170px">
            <span v-if="batchInfo.seedRecoveryTime">{{ batchInfo.seedRecoveryTime | dateFilter }}</span>
            <span v-else>-</span>
          </el-form-item>
          <h3>育苗灯：</h3>
          <div>
            <el-form-item label="白天补光间隔/分钟：">
              <el-input-number v-model="formData.dayFeedBgTime" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="白天补光时长/分钟：">
              <el-input-number v-model="formData.dayFeedBgLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上补光间隔/分钟：">
              <el-input-number v-model="formData.nightFeedBgTime" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="晚上补光时长/分钟：">
              <el-input-number v-model="formData.nightFeedBgLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
          <h3>喷淋阀：</h3>
          <div>
            <el-form-item label="白天执行时长/分钟：">
              <el-input-number v-model="formData.dayFeedWaterLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="白天执行间隔/分钟：">
              <el-input-number v-model="formData.dayFeedWaterCycle" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上开启时长/分钟：">
              <el-input-number v-model="formData.nightFeedWaterLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="晚上开启间隔/分钟：">
              <el-input-number v-model="formData.nightFeedWaterCycle" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="整体控制" name="five">
        <el-form ref="formName" :model="formData" label-width="150px" :inline="true">
          <el-form-item label="植物工厂时间：">
            <span>{{ formData.daySet || '-' }}</span>
            <el-checkbox v-model="formData.checkTime" true-label="1" false-label="0">是否同步本机时间至植物工厂</el-checkbox>
          </el-form-item>
          <div>
            <el-form-item label="时长/小时：">
              <el-input-number v-model="formData.dateLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
            <el-form-item label="时移/小时：">
              <el-input-number v-model="formData.dateYi" controls-position="right" :min="0" :max="99999999"></el-input-number>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="白天开始时间：">
              <el-time-picker v-model="formData.dayStartTime" placeholder="任意时间点" format="HH:mm"></el-time-picker>
            </el-form-item>
            <el-form-item label="白天结束时间：">
              <el-time-picker v-model="formData.dayEndTime" placeholder="任意时间点" format="HH:mm"></el-time-picker>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="晚上开始时间：">
              <el-time-picker v-model="formData.nightStartTime" placeholder="任意时间点" format="HH:mm"></el-time-picker>
            </el-form-item>
            <el-form-item label="晚上结束时间：">
              <el-time-picker v-model="formData.nightEndTime" placeholder="任意时间点" format="HH:mm"></el-time-picker>
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
    <p class="ta-c">
      <el-button type="primary" @click="submit('formName')" class="fl-l">确认</el-button>
      <el-button @click="resetForm('formName')">刷新</el-button>
      <el-button @click="$router.push(`/home/commonview/device-detail/${batchInfo.deviceId}`)" class="fl-r">
        &lt;&lt;返回批次信息页
      </el-button>
    </p>
    <div class="bottom-info ta-c">
      <control-btn></control-btn>
    </div>
  </el-row>
</template>
<script>
import ControlBtn from '../components/control-btn.vue'
import { vegetableNameMixin, controlModelMixin } from 'common/js/mixin.js'
export default {
  mixins: [vegetableNameMixin, controlModelMixin],
  components: {
    ControlBtn
  },
  data() {
    return {
      sn: '',
      batchId: '',
      batchInfo: {},
      isShow: false,
      activeName: 'first',
      checked: {
        one: false,
        two: false,
        three: false
      },
      formData: {}
    }
  },
  created() {
    this.batchInfo = this.$store.state.batchInfo
    this.sn = window.sessionStorage.getItem('sn') || ''
    this.getParamInfo()
  },
  methods: {
    submit(formName) {
      let valid = false
      this.$refs[formName].validate(v => {
        valid = v
      })
      if (!valid) {
        return false
      }
      const send = JSON.parse(JSON.stringify(this.formData))
      send.daySet = this.$dateFilter(send.daySet)
      send.dayStartTime = this.$dateFilter(send.dayStartTime, 'hh:mm:ss')
      send.dayEndTime = this.$dateFilter(send.dayEndTime, 'hh:mm:ss')
      send.nightStartTime = this.$dateFilter(send.nightStartTime, 'hh:mm:ss')
      send.nightEndTime = this.$dateFilter(send.nightEndTime, 'hh:mm:ss')
      send.sn = this.sn
      send.plantName1 = this.batchInfo.plantOne
      send.plantName2 = this.batchInfo.plantTwo
      send.plantName3 = this.batchInfo.plantThree
      send.growthPattern1 = this.batchInfo.cultModelOne
      send.growthPattern2 = this.batchInfo.cultModelTwo
      send.growthPattern3 = this.batchInfo.cultModelThree
      send.batchNo1 = '1' + this.batchInfo.batchCreatTime
      send.batchNo2 = '2' + this.batchInfo.batchCreatTime
      send.batchNo3 = '3' + this.batchInfo.batchCreatTime
      send.feedName = this.batchInfo.seedRoomPlant
      send.feedPlantingTime = this.$dateFilter(this.batchInfo.seedPlantingTime)
      send.feedRecoveryTime = this.$dateFilter(this.batchInfo.seedRecoveryTime)
      this.$http
        .post('paramSet/saveOrUpdate', send)
        .then(res => {
          this.$message.success(res.message)
          this.getParamInfo()
        })
        .catch(() => {
          this.getParamInfo()
        })
    },
    getParamInfo() {
      this.$http.get('paramSet/device', this.sn).then(res => {
        if (res.data === null) {
          this.formData = {}
        } else {
          const PREFIX = '2018/08/08 '
          this.formData = {
            paramSetId: res.data.paramSetId,
            daySet: this.$dateFilter(res.data.daySet),
            dateLength: res.data.dateLength,
            dateYi: res.data.dateYi,
            dayTemperature1: res.data.dayTemperature1,
            nightTemperature1: res.data.nightTemperature1,
            dayHumidity1: res.data.dayHumidity1,
            nightHumidity1: res.data.nightHumidity1,
            dayTemperature2: res.data.dayTemperature2,
            nightTemperature2: res.data.nightTemperature2,
            dayHumidity2: res.data.dayHumidity2,
            nightHumidity2: res.data.nightHumidity2,
            dayTemperature3: res.data.dayTemperature3,
            nightTemperature3: res.data.nightTemperature3,
            dayHumidity3: res.data.dayHumidity3,
            nightHumidity3: res.data.nightHumidity3,
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
          }
        }
      })
    },
    syncComputer(val) {
      if (val) {
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.getParamInfo()
    }
  }
}
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
