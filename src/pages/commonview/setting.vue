<template>
  <el-row>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="第一层" name="first">
        <el-form ref="formOne" :model="formFirst" label-width="170px" :inline="true">
          <el-form-item label="当前批次：">{{ batchInfo.batchId }}</el-form-item>
          <el-form-item label="蔬菜名称：">{{ batchInfo.plantOne }}</el-form-item>
          <el-form-item label="生长模式：">{{ batchInfo.cultModelOne | seeLabel(cultModel)}}</el-form-item>
          <h3>开启灯：</h3>
          <el-form-item label="白天补光时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天补光间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <h3>营养液：</h3>
          <el-form-item label="白天营养液循环时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天营养液循环间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上营养液循环时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上营养液循环间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="第二层" name="second">
        <el-form ref="formOne" :model="formFirst" label-width="170px" :inline="true">
          <el-form-item label="当前批次：">{{ batchInfo.batchId }}</el-form-item>
          <el-form-item label="蔬菜名称：">{{ batchInfo.plantOne }}</el-form-item>
          <el-form-item label="生长模式：">{{ batchInfo.cultModelOne | seeLabel(cultModel)}}</el-form-item>
          <h3>补光灯：</h3>
          <el-form-item label="白天补光时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天补光间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <h3>营养液：</h3>
          <el-form-item label="白天营养液循环时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天营养液循环间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上营养液循环时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上营养液循环间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="第三层" name="third">
        <el-form ref="formOne" :model="formFirst" label-width="170px" :inline="true">
          <el-form-item label="当前批次：">{{ batchInfo.batchId }}</el-form-item>
          <el-form-item label="蔬菜名称：">{{ batchInfo.plantOne }}</el-form-item>
          <el-form-item label="生长模式：">{{ batchInfo.cultModelOne | seeLabel(cultModel)}}</el-form-item>
          <h3>补光灯：</h3>
          <el-form-item label="白天补光时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天补光间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <h3>营养液：</h3>
          <el-form-item label="白天营养液循环时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天营养液循环间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上营养液循环时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上营养液循环间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="育苗室" name="four">
        <el-form ref="formOne" :model="formFirst" label-width="170px" :inline="true">
          <el-form-item label="蔬菜名称：" label-width="120px">{{ batchInfo.seedRoomPlant }}</el-form-item>
          <el-form-item label="播种日期：" label-width="120px">{{ batchInfo.seedPlantingTime | dateFilter }}</el-form-item>
          <el-form-item label="预计可移植日期：" label-width="170px">{{ batchInfo.seedRecoveryTime | dateFilter}}</el-form-item>
          <h3>育苗灯：</h3>
          <el-form-item label="白天开启时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天补光时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上开启时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <h3>喷淋阀：</h3>
          <el-form-item label="白天开启时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天补光时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上开启时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上补光时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="整体控制" name="five">
        <el-form ref="formOne" :model="formFirst" label-width="150px" :inline="true">
          <el-form-item label="时间设置：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="日长/小时：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="时移/小时：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天温度：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天湿度：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上温度：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上湿度：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天开始时间：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天结束时间">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上开始时间：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上结束时间">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <h3>换新风：</h3>
          <el-form-item label="白天换新风时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="白天换新风间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上换新风时长/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="晚上换新风间隔/分钟：">
            <el-input-number v-model="miaoDialog.data.seedRoomPlant" controls-position="right" :min="0" :max="99999999"></el-input-number>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-col :span="24" class="ta-c mb10">
        <el-button type="primary" @click="batchSubmit('formOne')">刷新</el-button>
      </el-col> -->
    </el-tabs>
    <p>
      <el-button type="primary">确认</el-button>
      <el-button>取消</el-button>
    </p>
    <div class="bottom-info ta-c">
      <el-button>
        <router-link :to="{ path: '/home/commonview/historydata',query:{id:$route.params.id}}">查询历史数据</router-link>
      </el-button>
      <el-button v-if="batchInfo.trustStatus === '0'">
        <router-link :to="{ path: '/home/commonview/apply-manage',query:{id:$route.params.id}}">申请专家托管</router-link>
      </el-button>
      <el-button v-if="batchInfo.trustStatus === '0'">申请服务器托管</el-button>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      batchId: "",
      batchInfo: {},
      trustStatus: "",
      cultModel: [],
      trustStatusArr: [],
      vegetableName: [],
      isShow: false,
      activeName2: "first",
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
          onePlantingTime: [
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
          ]
        }
      }
    };
  },
  created() {
    this.batchInfo = this.$store.state.batchInfo;
    this.getCultModel();
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
    getMiao() {
      this.$ajax.get("seed/last", this.batchId).then(res => {
        if (res.data === null) {
          this.miaoInfo = null;
        } else {
          this.miaoInfo = res.data;
        }
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
}
</style>
