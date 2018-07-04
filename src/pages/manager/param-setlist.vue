<template>
  <el-row>
    <div v-show="!addShow">
      <div v-if="setList.length > 0">
        <el-form label-width="110px" :inline="true" v-for="(item, index) in setList" :key="index" class="line">
          <p class="ta-r">
            <el-button type="text" @click="modifyParamSet(item)">修改参数设置信息</el-button>
          </p>
          <el-form-item label="蔬菜名称：">{{item.plantNo | seeLabel(vegetableName)}}</el-form-item>
          <el-form-item label="生长天数：">{{item.days}}</el-form-item>
          <el-form-item label="生长序号：">{{item.growthOrder}}</el-form-item>
          <el-form-item label="名称：">{{item.growthName}}</el-form-item>
          <el-form-item label="白天温度/℃：">{{item.bDayTemperature}}</el-form-item>
          <el-form-item label="白天湿度/RH%：">{{item.bDayHumidity}}</el-form-item>
          <el-form-item label="晚上温度/℃：">{{item.bNightTemperature}}</el-form-item>
          <el-form-item label="晚上湿度/RH%：">{{item.bNightHumidity}}</el-form-item>
          <el-form-item label="时长/小时：">{{item.aSc}}</el-form-item>
          <el-form-item label="时移/小时：">{{item.aSy}}</el-form-item>
          <el-form-item label="白天开始时间：">{{item.aDayStart}}</el-form-item>
          <el-form-item label="白天结束时间：">{{item.aDayEnd}}</el-form-item>
          <el-form-item label="晚上开始时间：">{{item.aNightStart}}</el-form-item>
          <el-form-item label="晚上结束时间：">{{item.aNightEnd}}</el-form-item>
          <h3>补光灯：</h3>
          <el-form-item label="白天补光时长/分钟：" label-width="170px">{{item.bDayBgLen}}</el-form-item>
          <el-form-item label="白天补光间隔/分钟：" label-width="170px">{{item.bDayBgInterval}}</el-form-item>
          <el-form-item label="晚上补光时长/分钟：" label-width="170px">{{item.bNightBgLen}}</el-form-item>
          <el-form-item label="晚上补光间隔/分钟：" label-width="170px">{{item.bNightBgInterval}}</el-form-item>
          <h3>营养液：</h3>
          <el-form-item label="白天营养液循环时长/分钟：" label-width="170px">{{item.bDayYyLen}}</el-form-item>
          <el-form-item label="白天营养液循环间隔/分钟：" label-width="170px">{{item.bDayYyInterval}}</el-form-item>
          <el-form-item label="晚上营养液循环时长/分钟：" label-width="170px">{{item.bNightYyLen}}</el-form-item>
          <el-form-item label="晚上营养液循环间隔/分钟：" label-width="170px">{{item.bNightYyInterval}}</el-form-item>
          <h3>换新风：</h3>
          <el-form-item label="白天换新风时长/分钟：" label-width="170px">{{item.aDayWindLen}}</el-form-item>
          <el-form-item label="白天换新风间隔/分钟：" label-width="170px">{{item.aDayWindInterval}}</el-form-item>
          <el-form-item label="晚上换新风时长/分钟：" label-width="170px">{{item.aNigthWindLen}}</el-form-item>
          <el-form-item label="晚上换新风间隔/分钟：" label-width="170px">{{item.aNightWindInterval}}</el-form-item>
        </el-form>
        <p class="ta-r">
          <el-button type="text" @click="addParamSet">继续添加</el-button>
        </p>
      </div>
      <p v-else>
        还没有参数设置信息，你可以
        <el-button type="text" @click="addParamSet">立即添加</el-button>
      </p>
    </div>
    <el-form ref="formName" :model="formData" label-width="110px" :inline="true" v-show="addShow" :rules="rules">
      <div>
        <el-form-item label="生长天数：" prop="days">
          <el-input v-model="formData.days"></el-input>
        </el-form-item>
        <el-form-item label="生长序号：" prop="growthOrder">
          <el-input v-model="formData.growthOrder"></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="growthName">
          <el-input v-model="formData.growthName"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="白天温度/℃：">
          <el-input-number v-model="formData.bDayTemperature" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="白天湿度/RH%：">
          <el-input-number v-model="formData.bDayHumidity" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="晚上温度/℃：">
          <el-input-number v-model="formData.bNightTemperature" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="晚上湿度/RH%：">
          <el-input-number v-model="formData.bNightHumidity" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="时长/小时：">
          <el-input-number v-model="formData.aSc" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="时移/小时：">
          <el-input-number v-model="formData.aSy" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="白天开始时间：">
          <el-time-picker v-model="formData.aDayStart" placeholder="任意时间点" format="HH:mm"></el-time-picker>
        </el-form-item>
        <el-form-item label="白天结束时间：">
          <el-time-picker v-model="formData.aDayEnd" placeholder="任意时间点" format="HH:mm"></el-time-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="晚上开始时间：">
          <el-time-picker v-model="formData.aNightStart" placeholder="任意时间点" format="HH:mm"></el-time-picker>
        </el-form-item>
        <el-form-item label="晚上结束时间：">
          <el-time-picker v-model="formData.aNightEnd" placeholder="任意时间点" format="HH:mm"></el-time-picker>
        </el-form-item>
      </div>
      <h3>补光灯：</h3>
      <div>
        <el-form-item label="白天补光时长/分钟：" label-width="170px">
          <el-input-number v-model="formData.bDayBgLen" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="白天补光间隔/分钟：" label-width="170px">
          <el-input-number v-model="formData.bDayBgInterval" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="晚上补光时长/分钟：" label-width="170px">
          <el-input-number v-model="formData.bNightBgLen" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="晚上补光间隔/分钟：" label-width="170px">
          <el-input-number v-model="formData.bNightBgInterval" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <h3>营养液：</h3>
      <div>
        <el-form-item label="白天营养液循环时长/分钟：" label-width="170px">
          <el-input-number v-model="formData.bDayYyLen" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="白天营养液循环间隔/分钟：" label-width="170px">
          <el-input-number v-model="formData.bDayYyInterval" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="晚上营养液循环时长/分钟：" label-width="170px">
          <el-input-number v-model="formData.bNightYyLen" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="晚上营养液循环间隔/分钟：" label-width="170px">
          <el-input-number v-model="formData.bNightYyInterval" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <h3>换新风：</h3>
      <div>
        <el-form-item label="白天换新风时长/分钟：" label-width="170px">
          <el-input-number v-model="formData.aDayWindLen" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="白天换新风间隔/分钟：" label-width="170px">
          <el-input-number v-model="formData.aDayWindInterval" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="晚上换新风时长/分钟：" label-width="170px">
          <el-input-number v-model="formData.aNigthWindLen" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="晚上换新风间隔/分钟：" label-width="170px">
          <el-input-number v-model="formData.aNightWindInterval" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <p class="ta-c">
        <el-button @click="addParamSetSubmit('formName')" type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </p>
    </el-form>
  </el-row>
</template>
<script>
import { vegetableNameMixin } from 'common/js/mixin.js'
export default {
  mixins: [vegetableNameMixin],
  data() {
    return {
      growthNo: '',
      addShow: false,
      setList: [],
      formData: {},
      rules: {
        days: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        growthOrder: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        growthName: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.growthNo = this.$route.query.model || ''
    this.plantNo = this.$route.query.plant || ''
    this.getList()
  },
  methods: {
    addParamSet() {
      this.addShow = true
      this.formData = {}
    },
    modifyParamSet(item) {
      this.addShow = true
      const PREFIX = '2018/08/08 '
      this.formData = {
        growthId: item.growthId,
        days: item.days,
        growthOrder: item.growthOrder,
        growthName: item.growthName,
        aSc: item.aSc,
        aSy: item.aSy,
        bDayTemperature: item.bDayTemperature,
        bNightTemperature: item.bNightTemperature,
        bDayHumidity: item.bDayHumidity,
        bNightHumidity: item.bNightHumidity,
        aDayStart: new Date(PREFIX + item.aDayStart),
        aDayEnd: new Date(PREFIX + item.aDayEnd),
        aNightStart: new Date(PREFIX + item.aNightStart),
        aNightEnd: new Date(PREFIX + item.aNightEnd),
        aDayWindLen: item.aDayWindLen,
        aDayWindInterval: item.aDayWindInterval,
        aNigthWindLen: item.aNigthWindLen,
        aNightWindInterval: item.aNightWindInterval,
        bDayBgLen: item.bDayBgLen,
        bDayBgInterval: item.bDayBgInterval,
        bNightBgLen: item.bNightBgLen,
        bNightBgInterval: item.bNightBgInterval,
        bDayYyLen: item.bDayYyLen,
        bDayYyInterval: item.bDayYyInterval,
        bNightYyLen: item.bNightYyLen,
        bNightYyInterval: item.bNightYyInterval
      }
    },
    addParamSetSubmit(formName) {
      if (!this.$validateForm(formName)) {
        return
      }
      const send = {
        ...this.formData,
        growthNo: this.growthNo,
        plantNo: this.plantNo
      }
      send.aDayStart = this.$dateFilter(send.aDayStart, 'hh:mm:ss')
      send.aDayEnd = this.$dateFilter(send.aDayEnd, 'hh:mm:ss')
      send.aNightStart = this.$dateFilter(send.aNightStart, 'hh:mm:ss')
      send.aNightEnd = this.$dateFilter(send.aNightEnd, 'hh:mm:ss')
      this.$http.post('paramSet/growth/saveOrUpdate', send).then(res => {
        this.$message.success(res.message)
        this.addShow = false
        this.getList()
      })
    },
    cancel() {
      this.addShow = false
      this.getList()
    },
    getList() {
      this.$http
        .get('paramSet/growth', `${this.growthNo}/plantNo/${this.plantNo}`)
        .then(res => {
          this.setList = res.data
        })
    }
  }
}
</script>
<style scoped>
h3 {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 20px;
  padding-left: 10px;
}
.line + .line {
  padding-top: 10px;
  border-top: 1px solid #e5e5e5;
}
</style>
