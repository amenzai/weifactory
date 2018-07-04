<template>
  <el-row v-if="isShow">
    <p class="ta-r">
      <el-button @click="$router.push('/home')">&lt;&lt;返回首页</el-button>
    </p>
    <el-col v-if="Object.keys(formFirst).length > 0">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="第一层" name="first">
          <el-row v-if="formFirst.plantOne">
            <el-button type="text" @click="discardCurrent(1)">废弃当前层</el-button>
            <el-form ref="formOne" :model="formFirst" label-width="100px">
              <el-col :span="6">
                <el-form-item label="蔬菜名称：">{{ formFirst.plantOne | seeLabel(vegetableName)}}</el-form-item>
                <el-form-item label="生长模式：">{{ formFirst.cultModelOne | seeLabel(cultModel)}}</el-form-item>
                <el-form-item label="温度/℃：">{{ formFirst.temperatureOne }}</el-form-item>
                <el-form-item label="湿度/RH%：">{{ formFirst.humidityOne }}</el-form-item>
                <el-form-item label="生长灯：">
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledOneLeft === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledOneMiddle === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledOneRight === '1'}"></i>
                </el-form-item>
              </el-col>
              <el-col :span="9" :offset="1">
                <el-form-item label="托管状态：">{{ trustStatus | seeLabel(trustStatusArr)}}</el-form-item>
                <el-form-item label="定植时间：">{{ formFirst.onePlantingTime | dateFilter('yyyy-MM-dd') }}</el-form-item>
                <el-form-item label="预计采收时间：" v-if="formFirst.cultModelOne == '3'">{{ formFirst.oneRecoveryTime | dateFilter('yyyy-MM-dd') }}</el-form-item>
              </el-col>
              <el-col :span="8">
                <img class="video-img" :src="formFirst.videoOne">
              </el-col>
            </el-form>
          </el-row>
          <p v-else>该层还没有批次信息，你可以
            <el-button type="text" @click="addBatch">立即添加</el-button>
          </p>
        </el-tab-pane>
        <el-tab-pane label="第二层" name="second">
          <el-row v-if="formFirst.plantTwo">
            <el-button type="text" @click="discardCurrent(2)">废弃当前层</el-button>
            <el-form ref="formOne" :model="formFirst" label-width="100px">
              <el-col :span="6">
                <el-form-item label="蔬菜名称：">{{ formFirst.plantTwo | seeLabel(vegetableName) }}</el-form-item>
                <el-form-item label="生长模式：">{{ formFirst.cultModelTwo | seeLabel(cultModel)}}</el-form-item>
                <el-form-item label="温度/℃：">{{ formFirst.temperatureTwo }}</el-form-item>
                <el-form-item label="湿度/RH%：">{{ formFirst.humidityTwo }}</el-form-item>
                <el-form-item label="生长灯：">
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledTwoLeft === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledTwoMiddle === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledTwoRight === '1'}"></i>
                </el-form-item>
              </el-col>
              <el-col :span="9" :offset="1">
                <el-form-item label="托管状态：">{{ trustStatus | seeLabel(trustStatusArr)}}</el-form-item>
                <el-form-item label="定植时间：">{{ formFirst.twoPlantingTime | dateFilter('yyyy-MM-dd') }}</el-form-item>
                <el-form-item label="预计采收时间：" v-if="formFirst.cultModelTwo == '3'">{{ formFirst.twoRecoveryTime | dateFilter('yyyy-MM-dd') }}</el-form-item>
              </el-col>
              <el-col :span="8">
                <img class="video-img" :src="formFirst.videoTwo">
              </el-col>
            </el-form>
          </el-row>
          <p v-else>该层还没有批次信息，你可以
            <el-button type="text" @click="addBatch">立即添加</el-button>
          </p>
        </el-tab-pane>
        <el-tab-pane label="第三层" name="third">
          <el-row v-if="formFirst.plantThree">
            <el-button type="text" @click="discardCurrent(3)">废弃当前层</el-button>
            <el-form ref="formOne" :model="formFirst" label-width="100px">
              <el-col :span="6">
                <el-form-item label="蔬菜名称：">{{ formFirst.plantThree | seeLabel(vegetableName) }}</el-form-item>
                <el-form-item label="生长模式：">{{ formFirst.cultModelThree | seeLabel(cultModel)}}</el-form-item>
                <el-form-item label="温度/℃：">{{ formFirst.temperatureThree }}</el-form-item>
                <el-form-item label="湿度/RH%：">{{ formFirst.humidityThree }}</el-form-item>
                <el-form-item label="生长灯：">
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledThreeLeft === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledThreeMiddle === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledThreeRight === '1'}"></i>
                </el-form-item>
              </el-col>
              <el-col :span="9" :offset="1">
                <el-form-item label="托管状态：">{{ trustStatus | seeLabel(trustStatusArr)}}</el-form-item>
                <el-form-item label="定植时间：">{{ formFirst.threePlantingTime | dateFilter('yyyy-MM-dd') }}</el-form-item>
                <el-form-item label="预计采收时间：" v-if="formFirst.cultModelThree == '3'">{{ formFirst.threeRecoveryTime | dateFilter('yyyy-MM-dd') }}</el-form-item>
              </el-col>
              <el-col :span="8">
                <img class="video-img" :src="formFirst.videoThree">
              </el-col>
            </el-form>
          </el-row>
          <p v-else>该层还没有批次信息，你可以
            <el-button type="text" @click="addBatch">立即添加</el-button>
          </p>
        </el-tab-pane>
        <el-tab-pane label="育苗室" name="four">
          <p v-if="!miaoInfo.seedRoomPlant">该批次未添加育苗，你可以
            <el-button type="text" @click="addMiao">立即添加</el-button>
          </p>
          <div v-else>
            <el-button type="text" @click="discardCurrent(4)">废弃育苗室</el-button>
            <el-form :inline="true" :model="miaoInfo" label-width="110px">
              <el-form-item label="蔬菜名称：">{{ miaoInfo.seedRoomPlant | seeLabel(vegetableName) }}</el-form-item>
              <el-form-item label="播种日期：">{{ miaoInfo.seedPlantingTime | dateFilter('yyyy-MM-dd')}}</el-form-item>
              <el-form-item label="预计可移植日期：">{{ miaoInfo.seedRecoveryTime | dateFilter('yyyy-MM-dd')}}</el-form-item>
            </el-form>
            <div class="btn-info">
              <p>
                <span>补光灯</span>
                <span>喷淋阀</span>
              </p>
              <P>
                <i class="el-icon-my-light-fill" :class="{'yellow':miaoInfo.seedLed === '1'}"></i>
                <i class="el-icon-my-light-fill" :class="{'yellow':miaoInfo.seedSpray === '1'}"></i>
              </P>
            </div>
          </div>
        </el-tab-pane>
        <!-- <el-col :span="24" class="ta-c mb10">
          <el-button type="primary" @click="batchSubmit('formOne')">刷新</el-button>
        </el-col> -->
      </el-tabs>
      <div class="bottom-info ta-c">
        <el-button :disabled="trustStatus === '1'" @click="$router.push('/home/commonview/setting')">
          参数设置
        </el-button>
        <el-button :disabled="trustStatus === '1'" @click="$router.push('/home/commonview/hand-setting')">
          手动控制
        </el-button>
        <el-button @click="$router.push('/home/commonview/history-data')">
          查询历史数据
        </el-button>
        <el-button v-if="trustStatus === '0'" @click="$router.push('/home/commonview/apply-manage')">
          申请专家托管
        </el-button>
        <el-button v-if="trustStatus === '0'" @click="applyServer">申请服务器托管</el-button>
        <el-button v-if="trustStatus !== '0'" @click="cancelHost" :disabled="userInfo.roleName === 'ROLE_EXPERT'">取消托管</el-button>
        <!-- <el-button>
          <router-link :to="{ path: '/home/commonview/btn-control'}">设备控制</router-link>
        </el-button> -->
      </div>
    </el-col>
    <el-col v-else>
      <p>该设备还没有批次信息，你可以
        <el-button type="text" @click="addBatch">立即添加</el-button>
      </p>
    </el-col>
    <el-dialog title="添加设备批次信息" width="60%" :visible.sync="batchDialog.visible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="batchDialog.data" label-width="110px">
        <el-row>
          <el-col :span="12">
            <h2 class="col-item-title">第一层</h2>
            <el-form-item label="蔬菜名称：">
              <el-select clearable v-model="batchDialog.data.plantOne" placeholder="请选择" :disabled="disabled.one">
                <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in vegetableName" :key="index"></el-option>
              </el-select>
              <!-- <el-input v-model="batchDialog.data.plantOne" class="inline" v-else :disabled="disabled.one"></el-input> -->
              <!-- <el-checkbox v-model="checked.one">手动输入</el-checkbox> -->
            </el-form-item>
            <el-form-item label="生长模式：">
              <el-select clearable v-model="batchDialog.data.cultModelOne" placeholder="请选择" :disabled="disabled.one">
                <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in cultModel" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <div v-show="batchDialog.data.cultModelOne === '3'">
              <!-- <el-form-item label="定植时间：">
                <el-date-picker v-model="batchDialog.data.onePlantingTime" type="datetime" placeholder="选择日期时间范围" :disabled="disabled.one" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" @change="checkDate">
                </el-date-picker>
              </el-form-item> -->
              <el-form-item label="预计采收时间：">
                <el-date-picker v-model="batchDialog.data.oneRecoveryTime" type="datetime" placeholder="选择日期时间范围" :disabled="disabled.one" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <h2 class="col-item-title">第二层</h2>
            <el-form-item label="蔬菜名称：">
              <el-select clearable v-model="batchDialog.data.plantTwo" placeholder="请选择" :disabled="disabled.two">
                <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in vegetableName" :key="index"></el-option>
              </el-select>
              <!-- <el-input v-model="batchDialog.data.plantTwo" class="inline" v-else :disabled="disabled.two"></el-input> -->
              <!-- <el-checkbox v-model="checked.two">手动输入</el-checkbox> -->
            </el-form-item>
            <el-form-item label="生长模式：">
              <el-select clearable v-model="batchDialog.data.cultModelTwo" placeholder="请选择" :disabled="disabled.two">
                <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in cultModel" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <div v-show="batchDialog.data.cultModelTwo === '3'">
              <!-- <el-form-item label="定植时间：">
                <el-date-picker v-model="batchDialog.data.twoPlantingTime" type="datetime" placeholder="选择日期时间范围" :disabled="disabled.two" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm">
                </el-date-picker>
              </el-form-item> -->
              <el-form-item label="预计采收时间：">
                <el-date-picker v-model="batchDialog.data.twoRecoveryTime" type="datetime" placeholder="选择日期时间范围" :disabled="disabled.two" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <h2 class="col-item-title">第三层</h2>
            <el-form-item label="蔬菜名称：">
              <el-select clearable v-model="batchDialog.data.plantThree" placeholder="请选择" :disabled="disabled.three">
                <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in vegetableName" :key="index"></el-option>
              </el-select>
              <!-- <el-input v-model="batchDialog.data.plantThree" class="inline" v-else :disabled="disabled.three"></el-input> -->
              <!-- <el-checkbox v-model="checked.three">手动输入</el-checkbox> -->
            </el-form-item>
            <el-form-item label="生长模式：">
              <el-select clearable v-model="batchDialog.data.cultModelThree" placeholder="请选择" :disabled="disabled.three">
                <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in cultModel" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <div v-show="batchDialog.data.cultModelThree === '3'">
              <!-- <el-form-item label="定植时间：">
                <el-date-picker v-model="batchDialog.data.threePlantingTime" type="datetime" placeholder="选择日期时间范围" :disabled="disabled.three" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm">
                </el-date-picker>
              </el-form-item> -->
              <el-form-item label="预计采收时间：">
                <el-date-picker v-model="batchDialog.data.threeRecoveryTime" type="datetime" placeholder="选择日期时间范围" :disabled="disabled.three" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加育苗信息" width="50%" :visible.sync="miaoDialog.visible" :close-on-click-modal="false">
      <el-form ref="addMiaoForm" :model="miaoDialog.data" label-width="120px" :rules="miaoDialog.rules">
        <el-form-item label="植物名称：" prop="seedRoomPlant">
          <el-select clearable v-model="miaoDialog.data.seedRoomPlant" placeholder="请选择">
            <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in vegetableName" :key="index"></el-option>
          </el-select>
          <!-- <el-input v-model="miaoDialog.data.seedRoomPlant" class="inline" v-else></el-input> -->
          <!-- <el-checkbox v-model="checked.four">手动输入</el-checkbox> -->
        </el-form-item>
        <!-- <el-form-item label="播种时间：" prop="seedPlantingTime">
          <el-date-picker v-model="miaoDialog.data.seedPlantingTime" type="datetime" placeholder="选择日期时间范围" format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="预计可移植日期：" prop="seedRecoveryTime">
          <el-date-picker v-model="miaoDialog.data.seedRecoveryTime" type="datetime" placeholder="选择日期时间范围" format="yyyy-MM-dd HH:mm" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMiaoSubmit('addMiaoForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import {
  vegetableNameMixin,
  controlModelMixin,
  trustStatusMixin
} from 'common/js/mixin.js'
export default {
  mixins: [vegetableNameMixin, controlModelMixin, trustStatusMixin],
  data() {
    return {
      deviceId: '',
      batchId: '',
      batchCreatTime: '',
      miaoInfo: {},
      trustStatus: '',
      isShow: false,
      activeName: 'first',
      userInfo: {},
      formFirst: {},
      disabled: {
        one: false,
        two: false,
        three: false
      },
      // checked: {
      //   one: false,
      //   two: false,
      //   three: false,
      //   four: false
      // },
      batchDialog: {
        visible: false,
        data: {}
      },
      miaoDialog: {
        visible: false,
        data: {},
        rules: {
          seedRoomPlant: [
            {
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          ],
          seedRecoveryTime: [
            {
              type: 'date',
              required: true,
              message: '不能为空',
              trigger: 'change'
            }
          ]
        }
      },
      pickerOptions: {
        disabledDate(time) {
          // var end = new Date()
          // end.setDate(end.getDate() + 15)
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  created() {
    this.deviceId = this.$route.params.id
    this.userInfo = this.$store.state.userInfo
    this.getList()
    this.getDeviceDetail()
  },
  methods: {
    init() {
      this.batchDialog.data = {
        plantOne: this.formFirst.plantOne || '',
        plantTwo: this.formFirst.plantTwo || '',
        plantThree: this.formFirst.plantThree || '',
        cultModelOne: this.formFirst.cultModelOne || '0',
        cultModelTwo: this.formFirst.cultModelTwo || '0',
        cultModelThree: this.formFirst.cultModelThree || '0',
        // onePlantingTime: this.formFirst.onePlantingTime || '',
        oneRecoveryTime: this.formFirst.oneRecoveryTime || '',
        // twoPlantingTime: this.formFirst.twoPlantingTime || '',
        twoRecoveryTime: this.formFirst.twoRecoveryTime || '',
        // threePlantingTime: this.formFirst.threePlantingTime || '',
        threeRecoveryTime: this.formFirst.threeRecoveryTime || ''
      }
      if (this.batchDialog.data.plantOne) {
        this.disabled.one = true
      }
      if (this.batchDialog.data.plantTwo) {
        this.disabled.two = true
      }
      if (this.batchDialog.data.plantThree) {
        this.disabled.three = true
      }
      this.miaoDialog.data = {
        batchId: this.batchId,
        seedRoomPlant: '',
        // seedPlantingTime: '',
        seedRecoveryTime: ''
      }
    },
    checkDate(val) {
      console.log(val)
    },
    applyServer() {
      this.$confirm('确定申请服务器托管?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .get('trust', `device/${this.deviceId}/trustStatus/1`)
            .then(res => {
              this.$message.success('申请成功！')
              this.getDeviceDetail()
            })
        })
        .catch(() => {})
    },
    cancelHost() {
      this.$confirm('确定取消托管?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$http.get('trust/cancle/deviceId', this.deviceId).then(res => {
            this.$message.success('取消托管成功！')
            this.getDeviceDetail()
          })
        })
        .catch(() => {})
    },
    getMiao() {
      this.$http.get('seed/last', this.batchId).then(res => {
        if (res.data === null) {
          this.miaoInfo = {}
        } else {
          this.miaoInfo = res.data
        }
        this.saveBatchInfo()
      })
    },
    addMiao() {
      this.resetForm('addMiaoForm')
      this.init()
      this.miaoDialog.visible = true
    },
    addMiaoSubmit(formName) {
      let valid = false
      this.$refs[formName].validate(v => {
        valid = v
      })
      if (!valid) {
        return false
      }
      const send = JSON.parse(JSON.stringify(this.miaoDialog.data))
      // send.seedPlantingTime = this.$dateFilter(send.seedPlantingTime)
      send.seedRecoveryTime = this.$dateFilter(send.seedRecoveryTime)
      this.$http.post('seed/save', send).then(res => {
        this.miaoDialog.visible = false
        this.getMiao()
        this.$message.success(res.message)
      })
    },
    getDeviceDetail() {
      this.$http.get('device/deviceInfo', this.deviceId).then(res => {
        this.trustStatus = res.data.trustStatus
      })
    },
    getList() {
      this.$http.get('batch', this.deviceId).then(res => {
        console.log('', res)
        this.isShow = true
        if (res.data === null) {
          this.formFirst = {}
        } else {
          // this.trustStatus = res.data.trustStatus
          this.formFirst = {
            plantOne: res.data.plantOne,
            plantTwo: res.data.plantTwo,
            plantThree: res.data.plantThree,
            ledOneLeft: res.data.ledOneLeft,
            ledOneMiddle: res.data.ledOneMiddle,
            ledOneRight: res.data.ledOneRight,
            ledTwoLeft: res.data.ledTwoLeft,
            ledTwoMiddle: res.data.ledTwoMiddle,
            ledTwoRight: res.data.ledTwoRight,
            ledThreeLeft: res.data.ledThreeLeft,
            ledThreeMiddle: res.data.ledThreeMiddle,
            ledThreeRight: res.data.ledThreeRight,
            cultModelOne: res.data.cultModelOne,
            cultModelTwo: res.data.cultModelTwo,
            cultModelThree: res.data.cultModelThree,
            humidityOne: res.data.humidityOne,
            humidityThree: res.data.humidityThree,
            humidityTwo: res.data.humidityTwo,
            temperatureOne: res.data.temperatureOne,
            temperatureThree: res.data.temperatureThree,
            temperatureTwo: res.data.temperatureTwo,
            onePlantingTime: this.$dateFilter(res.data.onePlantingTime),
            oneRecoveryTime: this.$dateFilter(res.data.oneRecoveryTime),
            twoPlantingTime: this.$dateFilter(res.data.twoPlantingTime),
            twoRecoveryTime: this.$dateFilter(res.data.twoRecoveryTime),
            threePlantingTime: this.$dateFilter(res.data.threePlantingTime),
            threeRecoveryTime: this.$dateFilter(res.data.threeRecoveryTime),
            videoOne: res.data.videoOne,
            videoTwo: res.data.videoTwo,
            videoThree: res.data.videoThree
          }
          this.batchId = res.data.batchId
          this.batchCreatTime = res.data.gmtCreate
          this.getMiao()
        }
      })
      console.log(this.deviceId, this.batchId)
    },
    saveBatchInfo() {
      const send = {
        deviceId: this.deviceId,
        trustStatus: this.trustStatus,
        batchId: this.batchId,
        batchCreatTime: this.batchCreatTime,
        plantOne: this.formFirst.plantOne,
        plantTwo: this.formFirst.plantTwo,
        plantThree: this.formFirst.plantThree,
        cultModelOne: this.formFirst.cultModelOne,
        cultModelTwo: this.formFirst.cultModelTwo,
        cultModelThree: this.formFirst.cultModelThree,
        seedRoomPlant: this.miaoInfo.seedRoomPlant,
        seedPlantingTime: this.miaoInfo.seedPlantingTime,
        seedRecoveryTime: this.miaoInfo.seedRecoveryTime
      }
      this.$store.commit('UPDATE_BATCH_INFO', send)
    },
    addBatch() {
      this.resetForm('addForm')
      this.init()
      this.batchDialog.visible = true
    },
    addSubmit(formName) {
      if (
        !this.batchDialog.data.plantOne &&
        !this.batchDialog.data.plantTwo &&
        !this.batchDialog.data.plantThree
      ) {
        this.$message.warning('请至少添加一层批次信息')
        return
      }
      if (this.batchDialog.data.plantOne) {
        if (!this.batchDialog.data.cultModelOne) {
          this.$message.warning('第一层生长模式不能为空')
          return
        }
        if (this.batchDialog.data.cultModelOne === '3') {
          if (!this.batchDialog.data.oneRecoveryTime) {
            this.$message.warning('第一层预计采收时间不能为空')
            return
          }
        }
      }
      if (this.batchDialog.data.plantTwo) {
        if (!this.batchDialog.data.cultModelTwo) {
          this.$message.warning('第二层生长模式不能为空')
          return
        }
        if (this.batchDialog.data.cultModelTwo === '3') {
          if (!this.batchDialog.data.twoRecoveryTime) {
            this.$message.warning('第二层预计采收时间不能为空')
            return
          }
        }
      }
      if (this.batchDialog.data.plantThree) {
        if (!this.batchDialog.data.cultModelThree) {
          this.$message.warning('第三层生长模式不能为空')
          return
        }
        if (this.batchDialog.data.cultModelThree === '3') {
          if (!this.batchDialog.data.threeRecoveryTime) {
            this.$message.warning('第三层预计采收时间不能为空')
            return
          }
        }
      }
      const send = JSON.parse(JSON.stringify(this.batchDialog.data))
      // send.onePlantingTime = this.$dateFilter(send.onePlantingTime)
      send.oneRecoveryTime = this.$dateFilter(send.oneRecoveryTime)
      // send.twoPlantingTime = this.$dateFilter(send.twoPlantingTime)
      send.twoRecoveryTime = this.$dateFilter(send.twoRecoveryTime)
      // send.threePlantingTime = this.$dateFilter(send.threePlantingTime)
      send.threeRecoveryTime = this.$dateFilter(send.threeRecoveryTime)
      send.deviceId = this.deviceId
      this.$http.post('batch/save', send).then(res => {
        this.batchDialog.visible = false
        this.getList()
        this.$message.success(res.message)
      })
    },
    discardCurrent(id) {
      const param = this.batchId + '/' + id
      this.$http.get('batch/remove', param).then(res => {
        this.$message.success(res.message)
        this.getList()
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped lang="less">
.video-img {
  width: 300px;
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
  i {
    margin-left: 12px;
    + i {
      margin-left: 48px;
    }
  }
}
</style>
