<template>
  <el-row v-if="isShow">
    <el-col v-if="formFirst !== null">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="第一层" name="first">
          <el-row>
            <el-col :span="14">
              <el-form ref="formOne" :model="formFirst" label-width="120px">
                <el-form-item label="蔬菜名称：">
                  <el-input v-model="formFirst.plantOne"></el-input>
                </el-form-item>
                <el-form-item label="栽培模式：">
                  <el-select clearable v-model="formFirst.cultModelOne" placeholder="请选择">
                    <el-option :label="item.value" :value="item.label" v-for="(item,index) in $getWord('cultModel')" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="温度：" required>
                  <el-button icon="minus" size="small" @click="totalAmount('minus',formFirst,1)"></el-button>
                  <el-input-number style="width:80px;" :step="1" size="small" :min="0" v-model="formFirst.temperatureOne" @change="totalAmount" :controls="false"></el-input-number>
                  <el-button icon="plus" size="small" @click="totalAmount('plus',formFirst,1)"></el-button>
                </el-form-item>
                <el-form-item label="湿度：" required>
                  <el-button icon="minus" size="small" @click="totalAmount('minus',formFirst,4)"></el-button>
                  <el-input-number style="width:80px;" :step="1" size="small" :min="0" v-model="formFirst.humidityOne" @change="totalAmount" :controls="false"></el-input-number>
                  <el-button icon="plus" size="small" @click="totalAmount('plus',formFirst,4)"></el-button>
                </el-form-item>
                <el-form-item label="EC值：" required>
                  <el-input v-model="formFirst.ecOne"></el-input>
                </el-form-item>
                <el-form-item label="PH值：" required>
                  <el-input v-model="formFirst.phOne"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom:0">
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledOneLeft === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledOneMiddle === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledOneRight === '1'}"></i>
                </el-form-item>
                <el-form-item label="灯开关：">
                  <el-switch v-model="formFirst.ledOneLeft" on-value="1" off-value="0"></el-switch>
                  <el-switch v-model="formFirst.ledOneMiddle" on-value="1" off-value="0"></el-switch>
                  <el-switch v-model="formFirst.ledOneRight" on-value="1" off-value="0"></el-switch>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8" :offset="2">
              <img class="video-img" :src="formFirst.videoOne"></img>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="第二层" name="second">
          <el-row>
            <el-col :span="14">
              <el-form ref="formOne" :model="formFirst" label-width="120px">
                <el-form-item label="蔬菜名称：">
                  <el-input v-model="formFirst.plantTwo"></el-input>
                </el-form-item>
                <el-form-item label="栽培模式：">
                  <el-select clearable v-model="formFirst.cultModelTwo" placeholder="请选择">
                    <el-option :label="item.value" :value="item.label" v-for="(item,index) in $getWord('cultModel')" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="温度：" required>
                  <el-button icon="minus" size="small" @click="totalAmount('minus',formFirst,2)"></el-button>
                  <el-input-number style="width:80px;" :step="1" size="small" :min="0" v-model="formFirst.temperatureTwo" @change="totalAmount" :controls="false"></el-input-number>
                  <el-button icon="plus" size="small" @click="totalAmount('plus',formFirst,2)"></el-button>
                </el-form-item>
                <el-form-item label="湿度：" required>
                  <el-button icon="minus" size="small" @click="totalAmount('minus',formFirst,5)"></el-button>
                  <el-input-number style="width:80px;" :step="1" size="small" :min="0" v-model="formFirst.humidityTwo " @change="totalAmount" :controls="false"></el-input-number>
                  <el-button icon="plus" size="small" @click="totalAmount('plus',formFirst,5)"></el-button>
                </el-form-item>
                <el-form-item label="EC值：" required>
                  <el-input v-model="formFirst.ecTwo "></el-input>
                </el-form-item>
                <el-form-item label="PH值：" required>
                  <el-input v-model="formFirst.phTwo "></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom:0">
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledTwoLeft === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledTwoMiddle === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledTwoRight === '1'}"></i>
                </el-form-item>
                <el-form-item label="灯开关：">
                  <el-switch v-model="formFirst.ledTwoLeft" on-value="1" off-value="0"></el-switch>
                  <el-switch v-model="formFirst.ledTwoMiddle" on-value="1" off-value="0"></el-switch>
                  <el-switch v-model="formFirst.ledTwoRight" on-value="1" off-value="0"></el-switch>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8" :offset="2">
              <img class="video-img" :src="formFirst.videoTwo"></img>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="第三层" name="third">
          <el-row>
            <el-col :span="14">
              <el-form ref="formOne" :model="formFirst" label-width="120px">
                <el-form-item label="蔬菜名称：">
                  <el-input v-model="formFirst.plantThree"></el-input>
                </el-form-item>
                <el-form-item label="栽培模式：">
                  <el-select clearable v-model="formFirst.cultModelThree" placeholder="请选择">
                    <el-option :label="item.value" :value="item.label" v-for="(item,index) in $getWord('cultModel')" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="温度：" required>
                  <el-button icon="minus" size="small" @click="totalAmount('minus',formFirst,3)"></el-button>
                  <el-input-number style="width:80px;" :step="1" size="small" :min="0" v-model="formFirst.temperatureThree" @change="totalAmount" :controls="false"></el-input-number>
                  <el-button icon="plus" size="small" @click="totalAmount('plus',formFirst,3)"></el-button>
                </el-form-item>
                <el-form-item label="湿度：" required>
                  <el-button icon="minus" size="small" @click="totalAmount('minus',formFirst,6)"></el-button>
                  <el-input-number style="width:80px;" :step="1" size="small" :min="0" v-model="formFirst.humidityThree " @change="totalAmount" :controls="false"></el-input-number>
                  <el-button icon="plus" size="small" @click="totalAmount('plus',formFirst,6)"></el-button>
                </el-form-item>
                <el-form-item label="EC值：" required>
                  <el-input v-model="formFirst.ecThree "></el-input>
                </el-form-item>
                <el-form-item label="PH值：" required>
                  <el-input v-model="formFirst.phThree "></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom:0">
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledThreeLeft === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledThreeMiddle === '1'}"></i>
                  <i class="el-icon-my-light-fill" :class="{'yellow':formFirst.ledThreeRight === '1'}"></i>
                </el-form-item>
                <el-form-item label="灯开关：">
                  <el-switch v-model="formFirst.ledThreeLeft" on-value="1" off-value="0"></el-switch>
                  <el-switch v-model="formFirst.ledThreeMiddle" on-value="1" off-value="0"></el-switch>
                  <el-switch v-model="formFirst.ledThreeRight" on-value="1" off-value="0"></el-switch>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8" :offset="2">
              <img class="video-img" :src="formFirst.videoThree"></img>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-col :span="24" class="ta-c mb10">
          <el-button type="primary" @click="batchSubmit('formOne')">刷新</el-button>
        </el-col>
      </el-tabs>
      <div class="bottom-info ta-c">
        <el-button>
          <router-link :to="{ path: '/home/commonview/historydata',query:{id:$route.params.id}}">查询历史数据</router-link>
        </el-button>
        <el-button>
          <router-link :to="{ path: '/home/commonview/apply-manage',query:{id:$route.params.id}}">申请专家托管</router-link>
        </el-button>
        <el-button>
          <router-link :to="{ path: '/home/commonview/btn-control'}">设备控制</router-link>
        </el-button>
      </div>
    </el-col>
    <el-col v-else>
      <p>该设备还没有批次信息，你可以
        <el-button type="text" @click="addBatch">立即添加</el-button>
      </p>
    </el-col>
    <el-dialog title="添加设备批次信息" size="large" :visible.sync="batchDialog.visible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="batchDialog.data" label-width="110px" :rules="batchDialog.rules">
        <el-row>
          <el-col :span="8">
            <h2 class="col-item-title">第一层</h2>
            <el-form-item label="蔬菜名称：" prop="plantOne">
              <el-input v-model="batchDialog.data.plantOne"></el-input>
            </el-form-item>
            <el-form-item label="栽培模式：" prop="cultModelOne">
              <el-select clearable v-model="batchDialog.data.cultModelOne" placeholder="请选择">
                <el-option :label="item.value" :value="item.label" v-for="(item,index) in $getWord('cultModel')" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="温度：" prop="temperatureOne">
              <el-button icon="minus" size="small" @click="totalAmount('minus',batchDialog.data,1)"></el-button>
              <el-input-number style="width:70px;" :step="1" size="small" :min="0" v-model="batchDialog.data.temperatureOne" @change="totalAmount" :controls="false"></el-input-number>
              <el-button icon="plus" size="small" @click="totalAmount('plus',batchDialog.data,1)"></el-button>
            </el-form-item>
            <el-form-item label="湿度：" prop="humidityOne">
              <el-button icon="minus" size="small" @click="totalAmount('minus',batchDialog.data,4)"></el-button>
              <el-input-number style="width:70px;" :step="1" size="small" :min="0" v-model="batchDialog.data.humidityOne " @change="totalAmount" :controls="false"></el-input-number>
              <el-button icon="plus" size="small" @click="totalAmount('plus',batchDialog.data,4)"></el-button>
            </el-form-item>
            <el-form-item label="ec值：" prop="ecOne">
              <el-input v-model="batchDialog.data.ecOne"></el-input>
            </el-form-item>
            <el-form-item label="ph值：" prop="phOne">
              <el-input v-model="batchDialog.data.phOne"></el-input>
            </el-form-item>
            <el-form-item label="左边led灯：" prop="ledOneLeft">
              <el-checkbox v-model="batchDialog.data.ledOneLeft" true-label="1" false-label="0">是否开启</el-checkbox>
            </el-form-item>
            <el-form-item label="中间led灯：" prop="ledOneMiddle">
              <el-checkbox v-model="batchDialog.data.ledOneMiddle" true-label="1" false-label="0">是否开启</el-checkbox>
            </el-form-item>
            <el-form-item label="右边led灯：" prop="ledOneRight">
              <el-checkbox v-model="batchDialog.data.ledOneRight" true-label="1" false-label="0">是否开启</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <h2 class="col-item-title">第二层</h2>
            <el-form-item label="蔬菜名称：" prop="plantTwo">
              <el-input v-model="batchDialog.data.plantTwo"></el-input>
            </el-form-item>
            <el-form-item label="栽培模式：" prop="cultModelTwo">
              <el-select clearable v-model="batchDialog.data.cultModelTwo" placeholder="请选择">
                <el-option :label="item.value" :value="item.label" v-for="(item,index) in $getWord('cultModel')" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="温度：" prop="temperatureTwo">
              <el-button icon="minus" size="small" @click="totalAmount('minus',batchDialog.data,2)"></el-button>
              <el-input-number style="width:70px;" :step="1" size="small" :min="0" v-model="batchDialog.data.temperatureTwo" @change="totalAmount" :controls="false"></el-input-number>
              <el-button icon="plus" size="small" @click="totalAmount('plus',batchDialog.data,2)"></el-button>
            </el-form-item>
            <el-form-item label="湿度：" prop="humidityTwo">
              <el-button icon="minus" size="small" @click="totalAmount('minus',batchDialog.data,5)"></el-button>
              <el-input-number style="width:70px;" :step="1" size="small" :min="0" v-model="batchDialog.data.humidityTwo " @change="totalAmount" :controls="false"></el-input-number>
              <el-button icon="plus" size="small" @click="totalAmount('plus',batchDialog.data,5)"></el-button>
            </el-form-item>
            <el-form-item label="ec值：" prop="ecTwo">
              <el-input v-model="batchDialog.data.ecTwo"></el-input>
            </el-form-item>
            <el-form-item label="ph值：" prop="phTwo">
              <el-input v-model="batchDialog.data.phTwo"></el-input>
            </el-form-item>
            <el-form-item label="左边led灯：" prop="ledTwoLeft">
              <el-checkbox v-model="batchDialog.data.ledTwoLeft" true-label="1" false-label="0">是否开启</el-checkbox>
            </el-form-item>
            <el-form-item label="中间led灯：" prop="ledTwoMiddle">
              <el-checkbox v-model="batchDialog.data.ledTwoMiddle" true-label="1" false-label="0">是否开启</el-checkbox>
            </el-form-item>
            <el-form-item label="右边led灯：" prop="ledTwoRight">
              <el-checkbox v-model="batchDialog.data.ledTwoRight" true-label="1" false-label="0">是否开启</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <h2 class="col-item-title">第三层</h2>
            <el-form-item label="蔬菜名称：" prop="plantThree">
              <el-input v-model="batchDialog.data.plantThree"></el-input>
            </el-form-item>
            <el-form-item label="栽培模式：" prop="cultModelThree">
              <el-select clearable v-model="batchDialog.data.cultModelThree" placeholder="请选择">
                <el-option :label="item.value" :value="item.label" v-for="(item,index) in $getWord('cultModel')" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="温度：" prop="temperatureThree">
              <el-button icon="minus" size="small" @click="totalAmount('minus',batchDialog.data,3)"></el-button>
              <el-input-number style="width:70px;" :step="1" size="small" :min="0" v-model="batchDialog.data.temperatureThree" @change="totalAmount" :controls="false"></el-input-number>
              <el-button icon="plus" size="small" @click="totalAmount('plus',batchDialog.data,3)"></el-button>
            </el-form-item>
            <el-form-item label="湿度：" prop="humidityThree">
              <el-button icon="minus" size="small" @click="totalAmount('minus',batchDialog.data,6)"></el-button>
              <el-input-number style="width:70px;" :step="1" size="small" :min="0" v-model="batchDialog.data.humidityThree " @change="totalAmount" :controls="false"></el-input-number>
              <el-button icon="plus" size="small" @click="totalAmount('plus',batchDialog.data,6)"></el-button>
            </el-form-item>
            <el-form-item label="ec值：" prop="ecThree">
              <el-input v-model="batchDialog.data.ecThree"></el-input>
            </el-form-item>
            <el-form-item label="ph值：" prop="phThree">
              <el-input v-model="batchDialog.data.phThree"></el-input>
            </el-form-item>
            <el-form-item label="左边led灯：" prop="ledThreeLeft">
              <el-checkbox v-model="batchDialog.data.ledThreeLeft" true-label="1" false-label="0">是否开启</el-checkbox>
            </el-form-item>
            <el-form-item label="中间led灯：" prop="ledThreeMiddle">
              <el-checkbox v-model="batchDialog.data.ledThreeMiddle" true-label="1" false-label="0">是否开启</el-checkbox>
            </el-form-item>
            <el-form-item label="右边led灯：" prop="ledThreeRight">
              <el-checkbox v-model="batchDialog.data.ledThreeRight" true-label="1" false-label="0">是否开启</el-checkbox>
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
        deviceId: '',
        batchId: '',
        isShow: false,
        activeName2: 'first',
        formFirst: {},
        batchDialog: {
          visible: false,
          data: {},
          rules: {
            plantOne: [{
              required: true,
              message: '请输入蔬菜名称',
              trigger: 'blur'
            }],
            plantTwo: [{
              required: true,
              message: '请输入蔬菜名称',
              trigger: 'blur'
            }],
            plantThree: [{
              required: true,
              message: '请输入蔬菜名称',
              trigger: 'blur'
            }],
            ecOne: [{
              required: true,
              message: '请输入ec值',
              trigger: 'blur'
            }],
            ecTwo: [{
              required: true,
              message: '请输入ec值',
              trigger: 'blur'
            }],
            ecThree: [{
              required: true,
              message: '请输入ec值',
              trigger: 'blur'
            }],
            phOne: [{
              required: true,
              message: '请输入ph值',
              trigger: 'blur'
            }],
            phTwo: [{
              required: true,
              message: '请输入ph值',
              trigger: 'blur'
            }],
            phThree: [{
              required: true,
              message: '请输入ph值',
              trigger: 'blur'
            }]
          }
        }
      }
    },
    created() {
      this.deviceId = this.$route.params.id
      this.getList()
    },
    methods: {
      init() {
        this.batchDialog.data = {
          temperatureOne: 0,
          temperatureTwo: 0,
          temperatureThree: 0,
          humidityOne: 0,
          humidityTwo: 0,
          humidityThree: 0,
          ledOneLeft: '',
          ledOneMiddle: '',
          ledOneRight: '',
          ledTwoLeft: '',
          ledTwoMiddle: '',
          ledTwoRight: '',
          ledThreeLeft: '',
          ledThreeMiddle: '',
          ledThreeRight: '',
          cultModelOne: '',
          cultModelTwo: '',
          cultModelThree: ''
        }
      },
      getList() {
        this.$ajax.get('batch', this.deviceId)
          .then(res => {
            console.log('', res);
            this.isShow = true;
            if (res.data === null) {
              this.formFirst = null
            } else {
              this.formFirst = {
                plantOne: res.data.plantOne,
                plantTwo: res.data.plantTwo,
                plantThree: res.data.plantThree,
                temperatureOne: res.data.temperatureOne,
                temperatureTwo: res.data.temperatureTwo,
                temperatureThree: res.data.temperatureThree,
                humidityOne: res.data.humidityOne,
                humidityTwo: res.data.humidityTwo,
                humidityThree: res.data.humidityThree,
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
                ecOne: res.data.ecOne,
                ecTwo: res.data.ecTwo,
                ecThree: res.data.ecThree,
                phOne: res.data.phOne,
                phTwo: res.data.phTwo,
                phThree: res.data.phThree,
                videoOne: res.data.videoOne,
                videoTwo: res.data.videoTwo,
                videoThree: res.data.videoThree
              }
              this.batchId = res.data.batchId
            }
          })
        console.log(this.deviceId, this.batchId)
      },
      addBatch() {
        this.resetForm('addForm')
        this.init()
        this.batchDialog.visible = true;
      },
      addSubmit(formName) {
        let valid = false;
        this.$refs[formName].validate((v) => {
          valid = v
        });
        if (!valid) {
          return false;
        }
        const send = JSON.parse(JSON.stringify(this.batchDialog.data));
        send.deviceId = this.deviceId
        this.$ajax.post('batch/saveOrUpdate', send)
          .then(res => {
            console.log('', res);
            var type = res.success ? 'success' : 'error';
            if (type === 'success') {
              this.resetForm('modifyForm');
              this.batchDialog.visible = false;
              this.getList();
            }
            this.$message({
              message: res.message,
              type: type
            });
          })
      },
      batchSubmit(formName) {
        let valid = false;
        this.$refs[formName].validate((v) => {
          valid = v
        });
        if (!valid) {
          return false;
        }
        const send = this.formFirst
        send.deviceId = this.deviceId
        send.batchId = this.batchId
        this.$ajax.post('batch/saveOrUpdate', send, true)
          .then(res => {
            console.log('', res);
            var type = res.success ? 'success' : 'error';
            if (type === 'success') {
              this.getList();
            }
            this.$message({
              message: res.message,
              type: type
            });
          })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      totalAmount(type, value, state) {
        if (type === 'minus') {
          switch (state) {
            case 1:
              value.temperatureOne && value.temperatureOne--;
              break;
            case 2:
              value.temperatureTwo && value.temperatureTwo--;
              break
            case 3:
              value.temperatureThree && value.temperatureThree--;
              break
            case 4:
              value.humidityOne && value.humidityOne--;
              break
            case 5:
              value.humidityTwo && value.humidityTwo--;
              break
            case 6:
              value.humidityThree && value.humidityThree--;
              break
          }
        } else if (type === 'plus') {
          switch (state) {
            case 1:
              value.temperatureOne++;
              break;
            case 2:
              value.temperatureTwo++;
              break
            case 3:
              value.temperatureThree++;
              break
            case 4:
              value.humidityOne++
                break
            case 5:
              value.humidityTwo++
                break
            case 6:
              value.humidityThree++
                break
          }
        }
      },
      resetForm(formName) {
        this.$refs[formName] && this.$refs[formName].resetFields();
      }
    }
}
</script>
<style scoped>
.video-img {
  width: 100%;
  height: auto;
  display: block;
}

.bottom-info {
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.el-icon-my-light-fill {
  margin-right: 60px;
  /*margin-left: 12px;*/
  font-size: 36px;
}

.el-switch {
  margin-right: 36px;
}

.col-item-title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 6px;
}
</style>
