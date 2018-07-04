<template>
  <el-row>
    <div v-show="!addShow">
      <div v-if="Object.keys(setList).length > 0">
        <el-form label-width="190px" :inline="true" class="line">
          <p class="ta-r">
            <el-button type="text" @click="modifyParamSet">修改参数设置信息</el-button>
          </p>
          <el-form-item label="蔬菜名称：" label-width="80px">{{setList.plantId | seeLabel(vegetableName)}}</el-form-item>
          <el-form-item label="育苗灯白天补光时长/分钟：">{{setList.dayFeedBgLength}}</el-form-item>
          <el-form-item label="育苗灯白天补光间隔/分钟：">{{setList.dayFeedBgInterval}}</el-form-item>
          <el-form-item label="育苗灯晚上补光时长/分钟：">{{setList.nightFeedBgLength}}</el-form-item>
          <el-form-item label="育苗灯晚上补光间隔/分钟：">{{setList.nightFeedBgInterval}}</el-form-item>
          <el-form-item label="喷淋阀白天执行时长/分钟：">{{setList.dayFeedWaterLength}}</el-form-item>
          <el-form-item label="喷淋阀白天执行间隔/分钟：">{{setList.dayFeedWaterInterval}}</el-form-item>
          <el-form-item label="喷淋阀晚上开启时长/分钟：">{{setList.nightFeedWaterLength}}</el-form-item>
          <el-form-item label="喷淋阀晚上开启间隔/分钟：">{{setList.nightFeedWaterInterval}}</el-form-item>
        </el-form>
      </div>
      <p v-else>
        还没有参数设置信息，你可以
        <el-button type="text" @click="addParamSet">立即添加</el-button>
      </p>
    </div>
    <el-form ref="formName" :model="formData" label-width="190px" :inline="true" v-show="addShow">
      <div>
        <el-form-item label="育苗灯白天补光时长/分钟：">
          <el-input-number v-model="formData.dayFeedBgLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="育苗灯白天补光间隔/分钟：">
          <el-input-number v-model="formData.dayFeedBgInterval" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="育苗灯晚上补光时长/分钟：">
          <el-input-number v-model="formData.nightFeedBgLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="育苗灯晚上补光间隔/分钟：">
          <el-input-number v-model="formData.nightFeedBgInterval" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="喷淋阀白天执行时长/分钟：">
          <el-input-number v-model="formData.dayFeedWaterLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="喷淋阀白天执行间隔/分钟：">
          <el-input-number v-model="formData.dayFeedWaterInterval" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="喷淋阀晚上开启时长/分钟：">
          <el-input-number v-model="formData.nightFeedWaterLength" controls-position="right" :min="0" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item label="喷淋阀晚上开启间隔/分钟：">
          <el-input-number v-model="formData.nightFeedWaterInterval" controls-position="right" :min="0" :max="99999999"></el-input-number>
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
      addShow: false,
      setList: [],
      formData: {}
    }
  },
  created() {
    this.plantId = this.$route.query.plant || ''
    this.getList()
  },
  methods: {
    addParamSet() {
      this.addShow = true
      this.formData = {}
    },
    modifyParamSet() {
      this.addShow = true
      this.formData = {
        feedParamId: this.setList.feedParamId,
        dayFeedBgLength: this.setList.dayFeedBgLength,
        dayFeedBgInterval: this.setList.dayFeedBgInterval,
        nightFeedBgLength: this.setList.nightFeedBgLength,
        nightFeedBgInterval: this.setList.nightFeedBgInterval,
        dayFeedWaterLength: this.setList.dayFeedWaterLength,
        dayFeedWaterInterval: this.setList.dayFeedWaterInterval,
        nightFeedWaterLength: this.setList.nightFeedWaterLength,
        nightFeedWaterInterval: this.setList.nightFeedWaterInterval
      }
    },
    addParamSetSubmit(formName) {
      if (!this.$validateForm(formName)) {
        return
      }
      const send = {
        ...this.formData,
        plantId: this.plantId
      }
      this.$http.post('paramSet/feedParamSet/saveOrUpdate', send).then(res => {
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
        .get('paramSet/feed', this.plantId)
        .then(res => {
          this.setList = res.data || {}
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
