<template>
  <el-row v-if="isShow">
    <el-col v-if="formFirst !== null">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="第一层" name="first">
          <el-row>
            <el-form ref="formOne" :model="formFirst" label-width="100px">
              <el-col :span="8">
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
              <el-col :span="14" :offset="2">
                <el-form-item label="托管状态：">{{ formFirst.temperatureOne | seeLabel(trustStatusArr)}}</el-form-item>
                <el-form-item label="定植时间：">{{ formFirst.humidityOne }}</el-form-item>
                <el-form-item label="预计采收时间：">{{ formFirst.humidityOne }}</el-form-item>
                <img class="video-img" :src="formFirst.videoOne">
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="第二层" name="second">
          <el-row>
            <el-form ref="formOne" :model="formFirst" label-width="100px">
              <el-col :span="8">
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
              <el-col :span="14" :offset="2">
                <el-form-item label="托管状态：">{{ formFirst.temperatureTwo | seeLabel(trustStatusArr)}}</el-form-item>
                <el-form-item label="定植时间：">{{ formFirst.humidityTwo }}</el-form-item>
                <el-form-item label="预计采收时间：">{{ formFirst.humidityTwo }}</el-form-item>
                <img class="video-img" :src="formFirst.videoTwo">
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="第三层" name="third">
          <el-row>
            <el-form ref="formOne" :model="formFirst" label-width="100px">
              <el-col :span="8">
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
              <el-col :span="14" :offset="2">
                <el-form-item label="托管状态：">{{ formFirst.temperatureThree | seeLabel(trustStatusArr)}}</el-form-item>
                <el-form-item label="定植时间：">{{ formFirst.humidityThree }}</el-form-item>
                <el-form-item label="预计采收时间：">{{ formFirst.humidityThree }}</el-form-item>
                <img class="video-img" :src="formFirst.videoThree">
              </el-col>
            </el-form>
          </el-row>
        </el-tab-pane>
        <!-- <el-col :span="24" class="ta-c mb10">
          <el-button type="primary" @click="batchSubmit('formOne')">刷新</el-button>
        </el-col> -->
      </el-tabs>
      <div class="bottom-info ta-c">
        <el-button>参数设置</el-button>
        <el-button>手动设置</el-button>
        <el-button>参数设置</el-button>
        <el-button>
          <router-link :to="{ path: '/home/commonview/historydata',query:{id:$route.params.id}}">查询历史数据</router-link>
        </el-button>
        <el-button v-if="trustStatus === '0'">
          <router-link :to="{ path: '/home/commonview/apply-manage',query:{id:$route.params.id}}">申请专家托管</router-link>
        </el-button>
        <el-button v-if="trustStatus === '0'">申请服务器托管</el-button>
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
    <el-dialog title="添加设备批次信息" width="90%" :visible.sync="batchDialog.visible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="batchDialog.data" label-width="110px" :rules="batchDialog.rules">
        <el-row>
          <el-col :span="12">
            <h2 class="col-item-title">第一层</h2>
            <el-form-item label="蔬菜名称：" prop="plantOne">
              <el-select clearable v-model="batchDialog.data.plantOne" placeholder="请选择" v-show="!checked.one">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in vegetableName" :key="index"></el-option>
              </el-select>
              <el-input v-model="batchDialog.data.plantOne" class="inline" v-show="checked.one"></el-input>
              <el-checkbox v-model="checked.one">手动输入</el-checkbox>
            </el-form-item>
            <el-form-item label="生长模式：" prop="cultModelOne">
              <el-select clearable v-model="batchDialog.data.cultModelOne" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in cultModel" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="定植时间：">
              <el-date-picker v-model="batchDialog.data.onePlantingTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预计采收时间：">
              <el-date-picker v-model="batchDialog.data.oneRecoveryTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <h2 class="col-item-title">第二层</h2>
            <el-form-item label="蔬菜名称：" prop="plantTwo">
              <el-select clearable v-model="batchDialog.data.plantTwo" placeholder="请选择" v-show="!checked.two">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in vegetableName" :key="index"></el-option>
              </el-select>
              <el-input v-model="batchDialog.data.plantTwo" class="inline" v-show="checked.two"></el-input>
              <el-checkbox v-model="checked.two">手动输入</el-checkbox>
            </el-form-item>
            <el-form-item label="生长模式：" prop="cultModelTwo">
              <el-select clearable v-model="batchDialog.data.cultModelTwo" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in cultModel" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="定植时间：">
              <el-date-picker v-model="batchDialog.data.twoPlantingTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预计采收时间：">
              <el-date-picker v-model="batchDialog.data.twoRecoveryTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <h2 class="col-item-title">第三层</h2>
            <el-form-item label="蔬菜名称：" prop="plantThree">
              <el-select clearable v-model="batchDialog.data.plantThree" placeholder="请选择" v-show="!checked.three">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in vegetableName" :key="index"></el-option>
              </el-select>
              <el-input v-model="batchDialog.data.plantThree" class="inline" v-show="checked.three"></el-input>
              <el-checkbox v-model="checked.three">手动输入</el-checkbox>
            </el-form-item>
            <el-form-item label="生长模式：" prop="cultModelOne">
              <el-select clearable v-model="batchDialog.data.cultModelOne" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in cultModel" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="定植时间：">
              <el-date-picker v-model="batchDialog.data.threePlantingTime" type="datetime" placeholder="选择日期时间范围">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预计采收时间：">
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
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      deviceId: "",
      batchId: "",
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
              message: "请输入蔬菜名称",
              trigger: "blur"
            }
          ],
          plantTwo: [
            {
              required: true,
              message: "请输入蔬菜名称",
              trigger: "blur"
            }
          ],
          plantThree: [
            {
              required: true,
              message: "请输入蔬菜名称",
              trigger: "blur"
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
<style scoped>
.video-img {
  width: 100%;
  height: auto;
  display: block;
}

.bottom-info {
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
</style>
