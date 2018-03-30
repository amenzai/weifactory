<template>
  <el-row v-if="isShow">
    <p class="ta-r"><el-button @click="$router.push('/home')">&lt;&lt;返回首页</el-button></p>
    <el-col v-if="formFirst !== null">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="第一层" name="first">
          <el-row>
            <el-form ref="formOne" :model="formFirst" label-width="100px">
              <el-col :span="8" :offset="2">
                <el-form-item label="蔬菜名称：">{{ formFirst.plantOne }}</el-form-item>
                <el-form-item label="生长模式：">{{ formFirst.cultModelOne | seeLabel(cultModel)}}</el-form-item>
                <el-form-item label="温度/℃：">{{ formFirst.temperatureOne }}</el-form-item>
                <el-form-item label="湿度/RH%：">{{ formFirst.humidityOne }}</el-form-item>
                <el-form-item label="生长灯：">
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledOneLeft === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledOneMiddle === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledOneRight === '1'}"></i>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="2">
                <el-form-item label="托管状态：">{{ trustStatus | seeLabel(trustStatusArr)}}</el-form-item>
                <el-form-item label="定植时间：">{{ formFirst.onePlantingTime | dateFilter }}</el-form-item>
                <el-form-item label="预计采收时间：">{{ formFirst.oneRecoveryTime | dateFilter }}</el-form-item>
                <img class="video-img" :src="formFirst.videoOne">
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="第二层" name="second">
          <el-row>
            <el-form ref="formOne" :model="formFirst" label-width="100px">
              <el-col :span="8" :offset="2">
                <el-form-item label="蔬菜名称：">{{ formFirst.plantTwo }}</el-form-item>
                <el-form-item label="生长模式：">{{ formFirst.cultModelTwo | seeLabel(cultModel)}}</el-form-item>
                <el-form-item label="温度/℃：">{{ formFirst.temperatureTwo }}</el-form-item>
                <el-form-item label="湿度/RH%：">{{ formFirst.humidityTwo }}</el-form-item>
                <el-form-item label="生长灯：">
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledTwoLeft === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledTwoMiddle === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledTwoRight === '1'}"></i>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="2">
                <el-form-item label="托管状态：">{{ trustStatus | seeLabel(trustStatusArr)}}</el-form-item>
                <el-form-item label="定植时间：">{{ formFirst.twoPlantingTime | dateFilter }}</el-form-item>
                <el-form-item label="预计采收时间：">{{ formFirst.twoRecoveryTime | dateFilter }}</el-form-item>
                <img class="video-img" :src="formFirst.videoTwo">
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="第三层" name="third">
          <el-row>
            <el-form ref="formOne" :model="formFirst" label-width="100px">
              <el-col :span="8" :offset="2">
                <el-form-item label="蔬菜名称：">{{ formFirst.plantThree }}</el-form-item>
                <el-form-item label="生长模式：">{{ formFirst.cultModelThree | seeLabel(cultModel)}}</el-form-item>
                <el-form-item label="温度/℃：">{{ formFirst.temperatureThree }}</el-form-item>
                <el-form-item label="湿度/RH%：">{{ formFirst.humidityThree }}</el-form-item>
                <el-form-item label="生长灯：">
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledThreeLeft === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledThreeMiddle === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledThreeRight === '1'}"></i>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="2">
                <el-form-item label="托管状态：">{{ trustStatus | seeLabel(trustStatusArr)}}</el-form-item>
                <el-form-item label="定植时间：">{{ formFirst.threePlantingTime | dateFilter }}</el-form-item>
                <el-form-item label="预计采收时间：">{{ formFirst.threeRecoveryTime | dateFilter }}</el-form-item>
                <img class="video-img" :src="formFirst.videoThree">
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="育苗室" name="four">
          <p v-if="!miaoInfo.seedRoomPlant">该批次未添加育苗，你可以
            <el-button type="text" @click="addMiao">立即添加</el-button>
          </p>
          <div v-else>
            <el-form :inline="true" :model="miaoInfo" label-width="110px">
              <el-form-item label="蔬菜名称：">{{ miaoInfo.seedRoomPlant }}</el-form-item>
              <el-form-item label="播种日期：">{{ miaoInfo.seedPlantingTime | dateFilter}}</el-form-item>
              <el-form-item label="预计可移植日期：">{{ miaoInfo.seedRecoveryTime | dateFilter}}</el-form-item>
            </el-form>
            <div class="btn-info">
              <p><span>补光灯</span><span>喷淋阀</span></p>
              <P><i class="el-icon-my-light-fill" :class="{'yellow':miaoInfo.seedLed === '1'}"></i>
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
        <el-button>
          <router-link :to="{ path: '/home/commonview/setting'}">参数设置</router-link>
        </el-button>
        <el-button>
          <router-link :to="{ path: '/home/commonview/hand-setting'}">手动控制</router-link>
        </el-button>
        <el-button>
          <router-link :to="{ path: '/home/commonview/history-data'}">查询历史数据</router-link>
        </el-button>
        <el-button v-if="trustStatus === '0'">
          <router-link :to="{ path: '/home/commonview/apply-manage'}">申请专家托管</router-link>
        </el-button>
        <el-button v-if="trustStatus === '0'" @click="applyServer">申请服务器托管</el-button>
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
      <el-form ref="addForm" :model="batchDialog.data" label-width="110px" :rules="batchDialog.rules">
        <el-row>
          <el-col :span="12">
            <h2 class="col-item-title">第一层</h2>
            <el-form-item label="蔬菜名称：" prop="plantOne">
              <el-select clearable v-model="batchDialog.data.plantOne" placeholder="请选择" v-if="!checked.one">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in vegetableName" :key="index"></el-option>
              </el-select>
              <el-input v-model="batchDialog.data.plantOne" class="inline" v-else></el-input>
              <el-checkbox v-model="checked.one">手动输入</el-checkbox>
            </el-form-item>
            <el-form-item label="生长模式：" prop="cultModelOne">
              <el-select clearable v-model="batchDialog.data.cultModelOne" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in cultModel" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="定植时间：" prop="onePlantingTime">
              <el-date-picker v-model="batchDialog.data.onePlantingTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预计采收时间：" prop="oneRecoveryTime">
              <el-date-picker v-model="batchDialog.data.oneRecoveryTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <h2 class="col-item-title">第二层</h2>
            <el-form-item label="蔬菜名称：" prop="plantTwo">
              <el-select clearable v-model="batchDialog.data.plantTwo" placeholder="请选择" v-if="!checked.two">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in vegetableName" :key="index"></el-option>
              </el-select>
              <el-input v-model="batchDialog.data.plantTwo" class="inline" v-else></el-input>
              <el-checkbox v-model="checked.two">手动输入</el-checkbox>
            </el-form-item>
            <el-form-item label="生长模式：" prop="cultModelTwo">
              <el-select clearable v-model="batchDialog.data.cultModelTwo" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in cultModel" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="定植时间：" prop="twoPlantingTime">
              <el-date-picker v-model="batchDialog.data.twoPlantingTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预计采收时间：" prop="twoRecoveryTime">
              <el-date-picker v-model="batchDialog.data.twoRecoveryTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <h2 class="col-item-title">第三层</h2>
            <el-form-item label="蔬菜名称：" prop="plantThree">
              <el-select clearable v-model="batchDialog.data.plantThree" placeholder="请选择" v-if="!checked.three">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in vegetableName" :key="index"></el-option>
              </el-select>
              <el-input v-model="batchDialog.data.plantThree" class="inline" v-else></el-input>
              <el-checkbox v-model="checked.three">手动输入</el-checkbox>
            </el-form-item>
            <el-form-item label="生长模式：" prop="cultModelThree">
              <el-select clearable v-model="batchDialog.data.cultModelThree" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in cultModel" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="定植时间：" prop="threePlantingTime">
              <el-date-picker v-model="batchDialog.data.threePlantingTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预计采收时间：" prop="threeRecoveryTime">
              <el-date-picker v-model="batchDialog.data.threeRecoveryTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加育苗信息" width="50%" :visible.sync="miaoDialog.visible" :close-on-click-modal="false">
      <el-form ref="addMiaoForm" :model="miaoDialog.data" label-width="120px" :rules="miaoDialog.rules">
        <el-form-item label="育苗室植物：" prop="seedRoomPlant">
          <el-input v-model="miaoDialog.data.seedRoomPlant" class="inline"></el-input>
        </el-form-item>
        <el-form-item label="播种时间：" prop="seedPlantingTime">
          <el-date-picker v-model="miaoDialog.data.seedPlantingTime" type="datetime" placeholder="选择日期时间范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计可移植日期：" prop="seedRecoveryTime">
          <el-date-picker v-model="miaoDialog.data.seedRecoveryTime" type="datetime" placeholder="选择日期时间范围">
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
export default {
  data() {
    return {
      deviceId: "",
      batchId: "",
      miaoInfo: {},
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
      batchDialog: {
        visible: false,
        data: {},
        rules: {
          plantOne: [
            {
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          plantTwo: [
            {
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          plantThree: [
            {
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          cultModelOne: [
            {
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          cultModelTwo: [
            {
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          cultModelThree: [
            {
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          onePlantingTime: [
            {
              type: "date",
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          twoPlantingTime: [
            {
              type: "date",
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          threePlantingTime: [
            {
              type: "date",
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          oneRecoveryTime: [
            {
              type: "date",
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          twoRecoveryTime: [
            {
              type: "date",
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          threeRecoveryTime: [
            {
              type: "date",
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ]
        }
      },
      miaoDialog: {
        visible: false,
        data: {},
        rules: {
          seedRoomPlant: [
            {
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          seedPlantingTime: [
            {
              type: "date",
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ],
          seedRecoveryTime: [
            {
              type: "date",
              required: true,
              message: "不能为空",
              trigger: "change"
            }
          ]
        }
      }
    };
  },
  created() {
    this.deviceId = this.$route.params.id;
    this.getList();
    this.getCultModel();
    this.getTrustStatus();
    this.getVegetableName();
  },
  methods: {
    init() {
      this.batchDialog.data = {
        plantOne: "",
        plantTwo: "",
        plantThree: "",
        cultModelOne: "",
        cultModelTwo: "",
        cultModelThree: "",
        onePlantingTime: "",
        oneRecoveryTime: "",
        twoPlantingTime: "",
        twoRecoveryTime: "",
        threePlantingTime: "",
        threeRecoveryTime: ""
      };
      this.miaoDialog.data = {
        batchId: this.batchId,
        seedRoomPlant: "",
        seedPlantingTime: "",
        seedRecoveryTime: ""
      };
    },
    applyServer() {
      this.$ajax.get("control/trust", this.batchId).then(res => {
        this.$message.success("申请成功！");
        this.getList();
      });
    },
    getMiao() {
      this.$ajax.get("seed/last", this.batchId).then(res => {
        if (res.data === null) {
          this.miaoInfo = {};
        } else {
          this.miaoInfo = res.data;
        }
        this.saveBatchInfo();
      });
    },
    addMiao() {
      this.resetForm("addMiaoForm");
      this.init();
      this.miaoDialog.visible = true;
    },
    addMiaoSubmit(formName) {
      let valid = false;
      this.$refs[formName].validate(v => {
        valid = v;
      });
      if (!valid) {
        return false;
      }
      const send = JSON.parse(JSON.stringify(this.miaoDialog.data));
      send.seedPlantingTime = this.$dateFilter(send.seedPlantingTime);
      send.seedRecoveryTime = this.$dateFilter(send.seedRecoveryTime);
      this.$ajax.post("seed/save", send).then(res => {
        this.miaoDialog.visible = false;
        this.getMiao();
        this.$message.success(res.message);
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
    getTrustStatus() {
      this.$ajax.get("dict/dictItemList/trustStatus").then(res => {
        this.trustStatusArr = res.data.map(item => {
          return {
            label: item.itemName,
            value: item.itemCode
          };
        });
      });
    },
    getVegetableName() {
      this.$ajax.get("dict/dictItemList/vegetable.name").then(res => {
        this.vegetableName = res.data.map(item => {
          return {
            label: item.itemName,
            value: item.itemCode
          };
        });
      });
    },
    getList() {
      this.$ajax.get("batch", this.deviceId).then(res => {
        console.log("", res);
        this.isShow = true;
        if (res.data === null) {
          this.formFirst = null;
        } else {
          this.trustStatus = res.data.trustStatus;
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
            onePlantingTime: this.$dateFilter(res.data.onePlantingTime),
            oneRecoveryTime: this.$dateFilter(res.data.oneRecoveryTime),
            twoPlantingTime: this.$dateFilter(res.data.twoPlantingTime),
            twoRecoveryTime: this.$dateFilter(res.data.twoRecoveryTime),
            threePlantingTime: this.$dateFilter(res.data.threePlantingTime),
            threeRecoveryTime: this.$dateFilter(res.data.threeRecoveryTime),
            videoOne: res.data.videoOne,
            videoTwo: res.data.videoTwo,
            videoThree: res.data.videoThree
          };
          this.batchId = res.data.batchId;
          this.getMiao();
        }
      });
      console.log(this.deviceId, this.batchId);
    },
    saveBatchInfo() {
      const send = {
        deviceId: this.deviceId,
        trustStatus: this.trustStatus,
        batchId: this.batchId,
        plantOne: this.formFirst.plantOne,
        plantTwo: this.formFirst.plantTwo,
        plantThree: this.formFirst.plantThree,
        cultModelOne: this.formFirst.cultModelOne,
        cultModelTwo: this.formFirst.cultModelTwo,
        cultModelThree: this.formFirst.cultModelThree,
        seedRoomPlant: this.miaoInfo.seedRoomPlant,
        seedPlantingTime: this.miaoInfo.seedPlantingTime,
        seedRecoveryTime: this.miaoInfo.seedRecoveryTime
      };
      this.$store.commit("UPDATE_BATCH_INFO", send);
    },
    addBatch() {
      this.resetForm("addForm");
      this.init();
      this.batchDialog.visible = true;
    },
    addSubmit(formName) {
      let valid = false;
      this.$refs[formName].validate(v => {
        valid = v;
      });
      if (!valid) {
        return false;
      }
      const send = JSON.parse(JSON.stringify(this.batchDialog.data));
      send.onePlantingTime = this.$dateFilter(send.onePlantingTime);
      send.oneRecoveryTime = this.$dateFilter(send.oneRecoveryTime);
      send.twoPlantingTime = this.$dateFilter(send.twoPlantingTime);
      send.twoRecoveryTime = this.$dateFilter(send.twoRecoveryTime);
      send.threePlantingTime = this.$dateFilter(send.threePlantingTime);
      send.threeRecoveryTime = this.$dateFilter(send.threeRecoveryTime);
      send.deviceId = this.deviceId;
      this.$ajax.post("batch/save", send).then(res => {
        this.batchDialog.visible = false;
        this.getList();
        this.$message.success(res.message);
      });
    },
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
  i {
    margin-left: 12px;
    + i {
      margin-left: 48px;
    }
  }
}
</style>
